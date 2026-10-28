/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_SHOW_SAMPLE_CONTENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
