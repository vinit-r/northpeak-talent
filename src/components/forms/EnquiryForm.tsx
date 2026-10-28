import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { formConfig } from '@/config/forms';
import { contactPage } from '@/content/copy';
import { countryOptions } from '@/content/markets';
import { services } from '@/content/services';
import { enquirySchema, type EnquiryValues } from '@/components/forms/schemas';
import { ConsentField, Honeypot, SubmitButton, SuccessPanel } from '@/components/forms/FormParts';
import { Turnstile } from '@/components/forms/Turnstile';
import { useToast } from '@/components/ui/toast-context';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useSubmitForm } from '@/hooks/useSubmitForm';

const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'not-sure', label: 'Not sure yet — need advice' },
];
const countries = countryOptions.map((c) => ({ value: c, label: c }));

interface EnquiryFormProps {
  presetService?: string;
  intent?: 'commercial-terms';
}

export function EnquiryForm({ presetService, intent }: EnquiryFormProps) {
  const { status, submit, reset: resetStatus } = useSubmitForm('enquiry');
  const { notify } = useToast();
  const [token, setToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);

  const validPreset = serviceOptions.some((o) => o.value === presetService) ? presetService : '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    defaultValues: { service: validPreset, message: '', website: '' },
  });

  const onSubmit = async ({ website, consent, ...values }: EnquiryValues) => {
    if (formConfig.turnstileEnabled && !token) {
      notify({ tone: 'error', message: 'Please complete the security check.' });
      return;
    }
    const serviceLabel =
      serviceOptions.find((o) => o.value === values.service)?.label ?? values.service;
    const ok = await submit({
      fields: {
        ...values,
        message: values.message ?? '',
        service: serviceLabel,
        intent: intent === 'commercial-terms' ? 'Commercial terms requested' : '',
        consent: 'Yes',
      },
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
        title="Enquiry received"
        text="Thank you. A founder will reply within one business day."
        resetLabel="Send another enquiry"
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
      {intent === 'commercial-terms' && (
        <p className="flex gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-fg">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {contactPage.termsIntent}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Company"
          required
          autoComplete="organization"
          error={errors.company?.message}
          {...register('company')}
        />
        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Select
          label="Country"
          required
          options={countries}
          error={errors.country?.message}
          {...register('country')}
        />
        <Select
          label="Service needed"
          required
          options={serviceOptions}
          error={errors.service?.message}
          {...register('service')}
        />
        <Input
          label="Roles / headcount"
          required
          placeholder="e.g. 2 × Senior Java, 1 × QA"
          error={errors.roles?.message}
          {...register('roles')}
        />
      </div>
      <Textarea
        label="Message"
        placeholder="Tech stack, seniority, location or time-zone needs, timelines…"
        error={errors.message?.message}
        {...register('message')}
      />
      <Honeypot registration={register('website')} />
      <ConsentField
        registration={register('consent')}
        error={errors.consent?.message}
        purpose="using these details to respond to my enquiry"
      />
      <Turnstile key={turnstileKey} onToken={setToken} />
      <SubmitButton
        submitting={submitting}
        label={intent ? 'Request commercial terms' : 'Send enquiry'}
      />
    </form>
  );
}
