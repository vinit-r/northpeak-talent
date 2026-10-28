import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formConfig } from '@/config/forms';
import { countryOptions } from '@/content/markets';
import { candidateSchema, type CandidateValues } from '@/components/forms/schemas';
import { ConsentField, Honeypot, SubmitButton, SuccessPanel } from '@/components/forms/FormParts';
import { Turnstile } from '@/components/forms/Turnstile';
import { useToast } from '@/components/ui/toast-context';
import { FileInput } from '@/components/ui/FileInput';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { fileToPayload } from '@/lib/submitForm';

const toOptions = (values: readonly string[]) => values.map((v) => ({ value: v, label: v }));
const countries = toOptions([
  ...countryOptions.filter((c) => c !== 'Other'),
  'Open to any',
  'Other',
]);
const experience = toOptions(formConfig.options.experience);
const notice = toOptions(formConfig.options.noticePeriod);

export function ResumeForm() {
  const { status, submit, reset: resetStatus } = useSubmitForm('candidate');
  const { notify } = useToast();
  const [token, setToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CandidateValues>({
    resolver: zodResolver(candidateSchema),
    mode: 'onTouched',
    defaultValues: { website: '' },
  });

  const onSubmit = async ({ resume, website, consent, ...values }: CandidateValues) => {
    if (formConfig.turnstileEnabled && !token) {
      notify({ tone: 'error', message: 'Please complete the security check.' });
      return;
    }
    let file;
    try {
      file = await fileToPayload(resume[0]!);
    } catch {
      notify({ tone: 'error', message: 'We could not read your file. Please try another copy.' });
      return;
    }
    const ok = await submit({
      fields: { ...values, consent: 'Yes' },
      file,
      honeypot: website ?? '',
      turnstileToken: token,
    });
    if (ok) reset();
    setToken('');
    setTurnstileKey((k) => k + 1);
  };

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Profile received"
        text="Thank you. We review every profile and will contact you when a suitable role comes up."
        resetLabel="Submit another resume"
        onReset={resetStatus}
      />
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-5"
      aria-busy={submitting}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Current location"
          required
          autoComplete="address-level2"
          placeholder="City, Country"
          error={errors.location?.message}
          {...register('location')}
        />
        <Select
          label="Preferred country"
          required
          options={countries}
          error={errors.preferredCountry?.message}
          {...register('preferredCountry')}
        />
        <Select
          label="Total experience"
          required
          options={experience}
          error={errors.experience?.message}
          {...register('experience')}
        />
        <Select
          label="Notice period"
          required
          options={notice}
          error={errors.noticePeriod?.message}
          {...register('noticePeriod')}
        />
        <FileInput
          label="Resume"
          required
          accept={formConfig.resume.accept}
          hint="PDF, DOC or DOCX · max 5 MB"
          error={errors.resume?.message}
          {...register('resume')}
        />
      </div>
      <Textarea
        label="Key skills"
        required
        rows={3}
        placeholder="e.g. Java, Spring Boot, AWS, Microservices"
        error={errors.skills?.message}
        {...register('skills')}
      />
      <Honeypot registration={register('website')} />
      <ConsentField
        registration={register('consent')}
        error={errors.consent?.message}
        purpose="storing my resume and contacting me about relevant roles. I can ask for deletion at any time"
      />
      <Turnstile key={turnstileKey} onToken={setToken} />
      <SubmitButton submitting={submitting} label="Submit resume" />
    </form>
  );
}
