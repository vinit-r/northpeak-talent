/**
 * Northpeak Talent — form backend (Google Apps Script Web App).
 *
 * Receives JSON from the website (Content-Type: text/plain to avoid CORS preflight), then:
 *   1. checks spam signals (honeypot, minimum fill time, optional Cloudflare Turnstile, rate limit)
 *   2. validates fields and the resume file (type, size, magic bytes) server-side
 *   3. saves resumes to a private Drive folder
 *   4. appends a row to the "Enquiries" or "Candidates" tab of a Google Sheet
 *   5. emails a notification to the team via MailApp
 *
 * Configure in Project Settings → Script Properties:
 *   SHEET_ID          ID of the Google Sheet (from its URL)
 *   DRIVE_FOLDER_ID   ID of the Drive folder for resumes (from its URL)
 *   NOTIFY_EMAIL      team address(es) for notifications, comma-separated
 *   TURNSTILE_SECRET  (optional) Cloudflare Turnstile secret key
 *
 * See README.md → "Google Apps Script setup" for deployment steps.
 */

var MIN_FILL_TIME_MS = 3000;
var MAX_FILE_BYTES = 5 * 1024 * 1024;
var RATE_LIMIT_PER_HOUR = 5;

var ALLOWED_FILES = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

var SHEETS = {
  enquiry: {
    name: 'Enquiries',
    columns: [
      'Timestamp',
      'Name',
      'Company',
      'Work email',
      'Country',
      'Service',
      'Roles / headcount',
      'Message',
      'Intent',
      'Consent',
      'Page',
    ],
    keys: [
      'name',
      'company',
      'email',
      'country',
      'service',
      'roles',
      'message',
      'intent',
      'consent',
    ],
    required: ['name', 'company', 'email', 'country', 'service', 'roles', 'consent'],
  },
  candidate: {
    name: 'Candidates',
    columns: [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Current location',
      'Preferred country',
      'Skills',
      'Experience',
      'Notice period',
      'Consent',
      'Resume link',
      'Page',
    ],
    keys: [
      'name',
      'email',
      'phone',
      'location',
      'preferredCountry',
      'skills',
      'experience',
      'noticePeriod',
      'consent',
    ],
    required: [
      'name',
      'email',
      'phone',
      'location',
      'preferredCountry',
      'skills',
      'experience',
      'noticePeriod',
      'consent',
    ],
  },
};

/* ------------------------------------------------------------------ entry points */

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var config = SHEETS[payload.formType];
    if (!config) return json_({ ok: false, error: 'Unknown form.' });

    var meta = payload.meta || {};
    var fields = payload.fields || {};

    // Spam: silently "succeed" so bots learn nothing.
    if (meta.honeypot) return json_({ ok: true });
    if (
      !meta.startedAt ||
      !meta.submittedAt ||
      meta.submittedAt - meta.startedAt < MIN_FILL_TIME_MS
    ) {
      return json_({ ok: true });
    }

    var props = PropertiesService.getScriptProperties();
    var turnstileSecret = props.getProperty('TURNSTILE_SECRET');
    if (turnstileSecret && !verifyTurnstile_(turnstileSecret, meta.turnstileToken)) {
      return json_({
        ok: false,
        error: 'Security check failed. Please refresh the page and try again.',
      });
    }

    var validationError = validateFields_(config, fields);
    if (validationError) return json_({ ok: false, error: validationError });

    if (isRateLimited_(fields.email)) {
      return json_({
        ok: false,
        error: 'Too many submissions. Please try again later or email us directly.',
      });
    }

    var resumeUrl = '';
    if (payload.formType === 'candidate') {
      var fileError = validateFile_(payload.file);
      if (fileError) return json_({ ok: false, error: fileError });
      resumeUrl = saveResume_(props.getProperty('DRIVE_FOLDER_ID'), payload.file, fields);
    }

    appendRow_(props.getProperty('SHEET_ID'), config, fields, resumeUrl, meta.page);
    notify_(props.getProperty('NOTIFY_EMAIL'), payload.formType, config, fields, resumeUrl);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Server error. Please try again or email us directly.' });
  }
}

/** Health check: open the Web App URL in a browser. */
function doGet() {
  return json_({ ok: true, service: 'northpeak-forms' });
}

/** Run once from the editor to create the sheet tabs with headers and authorise scopes. */
function setup() {
  var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SHEET_ID'));
  Object.keys(SHEETS).forEach(function (key) {
    getSheet_(ss, SHEETS[key]);
  });
  DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID'));
  MailApp.getRemainingDailyQuota();
}

/* ------------------------------------------------------------------ validation */

function validateFields_(config, fields) {
  for (var i = 0; i < config.required.length; i++) {
    var key = config.required[i];
    if (!fields[key] || String(fields[key]).trim() === '')
      return 'Please fill in all required fields.';
  }
  for (var k in fields) {
    if (String(fields[k]).length > 5000) return 'One of the fields is too long.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fields.email)))
    return 'Please enter a valid email address.';
  if (fields.phone && !/^\+?[\d\s()-]{7,20}$/.test(String(fields.phone)))
    return 'Please enter a valid phone number.';
  return '';
}

function validateFile_(file) {
  if (!file || !file.data || !file.name) return 'Please attach your resume.';
  var ext = String(file.name).split('.').pop().toLowerCase();
  if (!ALLOWED_FILES[ext]) return 'Resume must be a PDF, DOC or DOCX file.';
  if (file.type && ALLOWED_FILES[ext].indexOf(file.type) === -1)
    return 'Resume file type does not match its extension.';

  var bytes = Utilities.base64Decode(file.data);
  if (bytes.length > MAX_FILE_BYTES) return 'Resume must be 5 MB or smaller.';
  if (!hasValidSignature_(ext, bytes))
    return 'Resume file appears to be corrupted or is not a real document.';
  return '';
}

/** Checks magic bytes: PDF "%PDF", DOC OLE2 header, DOCX ZIP "PK". */
function hasValidSignature_(ext, bytes) {
  var b = function (i) {
    return (bytes[i] + 256) % 256;
  };
  if (ext === 'pdf') return b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46;
  if (ext === 'doc') return b(0) === 0xd0 && b(1) === 0xcf && b(2) === 0x11 && b(3) === 0xe0;
  if (ext === 'docx') return b(0) === 0x50 && b(1) === 0x4b;
  return false;
}

function verifyTurnstile_(secret, token) {
  if (!token) return false;
  var res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true,
  });
  try {
    return JSON.parse(res.getContentText()).success === true;
  } catch (e) {
    return false;
  }
}

function isRateLimited_(email) {
  var cache = CacheService.getScriptCache();
  var key =
    'rl_' +
    Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(email).toLowerCase()),
    ).slice(0, 40);
  var count = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(count), 3600);
  return count > RATE_LIMIT_PER_HOUR;
}

/* ------------------------------------------------------------------ storage */

function saveResume_(folderId, file, fields) {
  var ext = String(file.name).split('.').pop().toLowerCase();
  var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd_HHmm');
  var safeName =
    String(fields.name)
      .replace(/[^\w\- ]+/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 60) || 'candidate';
  var blob = Utilities.newBlob(
    Utilities.base64Decode(file.data),
    ALLOWED_FILES[ext][0],
    stamp + '_' + safeName + '.' + ext,
  );
  // The folder stays private: only people it is shared with can open the link.
  return DriveApp.getFolderById(folderId).createFile(blob).getUrl();
}

function appendRow_(sheetId, config, fields, resumeUrl, page) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_(SpreadsheetApp.openById(sheetId), config);
    var row = [new Date()].concat(
      config.keys.map(function (k) {
        return safeCell_(fields[k]);
      }),
    );
    if (config === SHEETS.candidate) row.push(resumeUrl);
    row.push(safeCell_(page));
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(ss, config) {
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
    sheet.appendRow(config.columns);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, config.columns.length).setFontWeight('bold');
  }
  return sheet;
}

/** Prevents spreadsheet formula injection (=, +, -, @ at the start of a cell). */
function safeCell_(value) {
  var s = value == null ? '' : String(value);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

/* ------------------------------------------------------------------ email */

function notify_(to, formType, config, fields, resumeUrl) {
  if (!to) return;
  var title =
    formType === 'candidate'
      ? 'New candidate: ' + fields.name + ' (' + fields.experience + ')'
      : 'New enquiry: ' + fields.company + ' — ' + fields.service;

  var rows = config.keys
    .map(function (k, i) {
      return (
        '<tr><td style="padding:6px 12px 6px 0;color:#475569;vertical-align:top">' +
        escape_(config.columns[i + 1]) +
        '</td><td style="padding:6px 0">' +
        escape_(fields[k] || '—').replace(/\n/g, '<br>') +
        '</td></tr>'
      );
    })
    .join('');
  if (resumeUrl) {
    rows +=
      '<tr><td style="padding:6px 12px 6px 0;color:#475569">Resume</td><td><a href="' +
      escape_(resumeUrl) +
      '">Open in Drive</a></td></tr>';
  }

  MailApp.sendEmail({
    to: to,
    subject: '[Website] ' + title,
    replyTo: fields.email,
    name: 'Northpeak Talent Website',
    htmlBody:
      '<div style="font-family:Arial,sans-serif;font-size:14px;color:#0F172A">' +
      '<h2 style="font-size:18px;margin:0 0 12px">' +
      escape_(title) +
      '</h2>' +
      '<table style="border-collapse:collapse">' +
      rows +
      '</table></div>',
  });
}

function escape_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
