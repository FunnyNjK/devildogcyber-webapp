import { useState } from 'react';
import type { FormEvent } from 'react';

import { TurnstileWidget } from './TurnstileWidget';
import {
  emptyContactFormInput,
  type ContactFormErrors,
  type ContactFormInput,
  validateContactFormInput,
} from '../lib/contactValidation';

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
};

type SubmissionState =
  | { kind: 'idle' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

const contactDeliveryFailureMessage =
  'Something went wrong while sending your message. Please try again later. If the issue persists, our team will review it.';

const rateLimitFailureMessage =
  'Too many messages were sent recently. Please wait several minutes before trying again.';

export type ContactFormProps = {
  siteKey: string;
  honeypotFieldName: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-[color:var(--dd-red-bright)]">{message}</p>;
}

function inputClassName(hasError: boolean) {
  return `w-full rounded-[1.15rem] border bg-white px-4 py-3 text-base text-[color:var(--dd-copy)] outline-none transition placeholder:text-[color:var(--dd-muted)] focus:border-[color:var(--dd-red)] focus:ring-4 focus:ring-[rgba(176,17,22,0.12)] ${
    hasError ? 'border-[color:var(--dd-red-bright)]' : 'border-[color:var(--dd-border)]'
  }`;
}

export function ContactForm({ siteKey, honeypotFieldName }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInput>(emptyContactFormInput);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ kind: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileResetCounter, setTurnstileResetCounter] = useState(0);

  function updateField<K extends keyof ContactFormInput>(field: K, value: ContactFormInput[K]) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined,
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState({ kind: 'idle' });

    const validation = validateContactFormInput(formData, { requireTurnstileToken: true });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmissionState({
        kind: 'error',
        message: 'Please review the highlighted fields and try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    const submitBody = {
      ...validation.data,
      [honeypotFieldName]: honeypot,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitBody),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.status === 429) {
        setSubmissionState({
          kind: 'error',
          message: rateLimitFailureMessage,
        });
        setTurnstileResetCounter((c) => c + 1);
        return;
      }

      if (!response.ok || !result?.ok) {
        if (typeof result?.message === 'string' && result.message.toLowerCase().includes('verification')) {
          setTurnstileResetCounter((c) => c + 1);
          setFieldErrors((current) => ({
            ...current,
            turnstileToken: result.message,
          }));
        }

        setSubmissionState({
          kind: 'error',
          message: result?.message ?? contactDeliveryFailureMessage,
        });
        return;
      }

      setFormData(emptyContactFormInput);
      setHoneypot('');
      setTurnstileResetCounter((c) => c + 1);
      setSubmissionState({
        kind: 'success',
        message: result.message ?? 'Your message has been sent. DevilDog will follow up as soon as possible.',
      });
    } catch {
      setSubmissionState({
        kind: 'error',
        message: contactDeliveryFailureMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[color:var(--dd-border)] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
      <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="pointer-events-none absolute -left-[5000px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              name={honeypotFieldName}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)]">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(event) => updateField('name', event.target.value)}
              className={inputClassName(Boolean(fieldErrors.name))}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            <FieldError message={fieldErrors.name} />
          </label>

          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)]">Email Address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
              className={inputClassName(Boolean(fieldErrors.email))}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            <FieldError message={fieldErrors.email} />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)]">Company Name</span>
          <input
            type="text"
            name="companyName"
            autoComplete="organization"
            value={formData.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
            className={inputClassName(Boolean(fieldErrors.companyName))}
            aria-invalid={Boolean(fieldErrors.companyName)}
          />
          <FieldError message={fieldErrors.companyName} />
        </label>

        <label className="block">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)]">Message</span>
          <textarea
            name="message"
            rows={7}
            value={formData.message}
            onChange={(event) => updateField('message', event.target.value)}
            className={inputClassName(Boolean(fieldErrors.message))}
            aria-invalid={Boolean(fieldErrors.message)}
          />
          <FieldError message={fieldErrors.message} />
        </label>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)]">Human Verification</span>
          <div className="mt-3">
            <TurnstileWidget
              siteKey={siteKey}
              errorMessage={fieldErrors.turnstileToken}
              onTokenChange={(token) => updateField('turnstileToken', token)}
              onWidgetMessageChange={(message) =>
                setFieldErrors((current) => ({
                  ...current,
                  turnstileToken: message,
                }))
              }
              resetCounter={turnstileResetCounter}
            />
          </div>
        </div>

        {submissionState.kind !== 'idle' ? (
          <div
            className={`rounded-[1.5rem] px-4 py-3 text-sm leading-7 ${
              submissionState.kind === 'success'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border border-[rgba(176,17,22,0.22)] bg-[rgba(176,17,22,0.06)] text-[color:var(--dd-copy)]'
            }`}
          >
            {submissionState.message}
          </div>
        ) : null}

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm leading-7 text-[color:var(--dd-muted)]">
            The form sends your message to DevilDog by email after Cloudflare Turnstile and the server both verify the submission.
            Secrets stay server-side — they are never exposed in the browser.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-w-52 items-center justify-center rounded-full bg-[color:var(--dd-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_30px_rgba(108,4,4,0.2)] transition hover:bg-[color:var(--dd-red-deep)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
