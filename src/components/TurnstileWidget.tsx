import { useEffect, useRef, useState } from 'react';

type TurnstileWidgetProps = {
  siteKey: string;
  errorMessage?: string;
  onTokenChange: (token: string) => void;
  onWidgetMessageChange: (message?: string) => void;
  resetCounter: number;
};

type TurnstileRenderOptions = {
  action?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
};

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({
  siteKey,
  errorMessage,
  onTokenChange,
  onWidgetMessageChange,
  resetCounter,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onWidgetMessageChangeRef = useRef(onWidgetMessageChange);
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onWidgetMessageChangeRef.current = onWidgetMessageChange;
  }, [onTokenChange, onWidgetMessageChange]);

  useEffect(() => {
    const trimmedKey = siteKey.trim();
    if (!trimmedKey) {
      return;
    }

    const existingTurnstile = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]',
    );

    if (window.turnstile) {
      setIsScriptReady(true);
      return;
    }

    if (existingTurnstile) {
      existingTurnstile.addEventListener('load', () => setIsScriptReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => setIsScriptReady(true);
    document.head.append(script);
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey.trim() || !isScriptReady || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey.trim(),
      theme: 'light',
      action: 'contact_form',
      callback: (token) => {
        onWidgetMessageChangeRef.current(undefined);
        onTokenChangeRef.current(token);
      },
      'expired-callback': () => {
        onTokenChangeRef.current('');
        onWidgetMessageChangeRef.current('Verification expired. Please complete the challenge again.');
      },
      'error-callback': () => {
        onTokenChangeRef.current('');
        onWidgetMessageChangeRef.current('Verification could not load correctly. Please try again.');
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isScriptReady, siteKey]);

  useEffect(() => {
    if (resetCounter === 0 || !widgetIdRef.current || !window.turnstile) {
      return;
    }

    onTokenChangeRef.current('');
    window.turnstile.reset(widgetIdRef.current);
  }, [resetCounter]);

  const trimmedSiteKey = siteKey.trim();

  if (!trimmedSiteKey) {
    return (
      <div className="rounded-[1.5rem] border border-[rgba(176,17,22,0.22)] bg-[rgba(176,17,22,0.06)] px-4 py-4 text-sm leading-7 text-[color:var(--dd-copy)]">
        Cloudflare Turnstile is not configured yet. Add `PUBLIC_TURNSTILE_SITE_KEY` to your local `.env.local` or deployment
        environment to enable human verification.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="min-h-20 rounded-[1.5rem] border border-[color:var(--dd-border)] bg-[color:var(--dd-cream)] px-4 py-4">
        <div ref={containerRef} />
      </div>
      {errorMessage ? (
        <p className="text-sm font-medium text-[color:var(--dd-red-bright)]">{errorMessage}</p>
      ) : (
        <p className="text-sm leading-7 text-[color:var(--dd-muted)]">Complete the verification challenge before sending your message.</p>
      )}
    </div>
  );
}
