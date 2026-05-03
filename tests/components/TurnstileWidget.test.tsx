import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TurnstileWidget } from '../../src/components/TurnstileWidget';

afterEach(cleanup);

describe('TurnstileWidget', () => {
  it('shows configuration guidance while the Turnstile site key is absent', () => {
    render(
      <TurnstileWidget
        resetCounter={0}
        siteKey="   "
        onTokenChange={vi.fn()}
        onWidgetMessageChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/PUBLIC_TURNSTILE_SITE_KEY/i)).toBeInTheDocument();
  });
});
