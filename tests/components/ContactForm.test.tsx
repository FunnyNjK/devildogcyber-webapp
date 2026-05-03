import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContactForm } from '../../src/components/ContactForm';

vi.mock('../../src/components/TurnstileWidget', () => {
  const Mock = ({
    onTokenChange,
    siteKey,
  }: {
    onTokenChange: (token: string) => void;
    siteKey: string;
  }) => {
    React.useLayoutEffect(() => {
      if (!siteKey.trim()) {
        return;
      }

      onTokenChange('fixture-turnstile-token');
      // Props callback identity changes each parent render — only re-run when the site key changes.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteKey]);

    return siteKey.trim() ? <div data-testid="turnstile-mock">turnstile</div> : null;
  };

  return { TurnstileWidget: Mock };
});

afterEach(cleanup);

function fillValidForm(container: HTMLElement) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Company Name' }), {
    target: { value: 'DevilDog Client' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
    target: {
      value: 'We need cybersecurity help tying compliance to measurable monitoring milestones.',
    },
  });
  return container.ownerDocument.querySelector('form') as HTMLFormElement;
}

describe('ContactForm', () => {
  it('shows field-level validation messages when submissions are incomplete', async () => {
    const view = render(<ContactForm honeypotFieldName="company_website" siteKey="site-key-fixture" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.submit(view.container.querySelector('form') as HTMLFormElement);

    expect(screen.getAllByText(/please enter/i).length).toBeGreaterThanOrEqual(1);
  });

  it('places a honeypot field in the document with the negotiated field name', () => {
    const view = render(<ContactForm honeypotFieldName="company_website" siteKey="" />);

    const trap = view.container.ownerDocument.querySelector('input[name="company_website"]');
    expect(trap).not.toBeNull();

    expect(trap?.closest('[aria-hidden]')).not.toBeNull();
  });

  it('shows success feedback after Postmark acknowledges the inquiry', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: 'Thanks!' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    );

    const view = render(<ContactForm honeypotFieldName="company_website" siteKey="site-key-fixture" />);
    await screen.findByTestId('turnstile-mock');

    const form = fillValidForm(view.container);
    fireEvent.submit(form);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());

    expect(
      fetchSpy.mock.calls.some(([endpoint]) =>
        typeof endpoint === 'string' ? endpoint.endsWith('/api/contact') : false,
      ),
    ).toBe(true);

    expect(await screen.findByText(/thanks!/i)).toBeVisible();

    fetchSpy.mockRestore();
  });

  it('surfaces verification-related errors returned by /api/contact', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: false, message: 'Verification expired. Complete again.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }),
    );

    const view = render(<ContactForm honeypotFieldName="company_website" siteKey="site-key-fixture" />);
    await screen.findByTestId('turnstile-mock');

    const form = fillValidForm(view.container);
    fireEvent.submit(form);

    expect(await screen.findByText(/verification expired/i)).toBeVisible();

    fetchSpy.mockRestore();
  });
});
