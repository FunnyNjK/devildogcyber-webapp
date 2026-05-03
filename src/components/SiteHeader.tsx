import { useEffect, useId, useRef, useState } from 'react';

import type { NavigationGroup, NavigationLink } from '../content/siteContent';

type SiteHeaderProps = {
  primaryNavigation: readonly NavigationLink[];
  navigationGroups: readonly NavigationGroup[];
};

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current">
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current">
      <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavDropdown({ group }: { group: NavigationGroup }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const root = containerRef.current;
      if (root && !root.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !isOpen) return;
      event.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const focusFirstLink = () => {
    queueMicrotask(() => firstLinkRef.current?.focus());
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((prev) => {
        const next = !prev;
        if (!prev && next) focusFirstLink();
        return next;
      });
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        focusFirstLink();
      } else {
        firstLinkRef.current?.focus();
      }
    }
  };

  const handleLinkKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const panel = panelRef.current;
    if (!panel) return;
    const anchors = [...panel.querySelectorAll<HTMLAnchorElement>('a')];

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      anchors[index + 1]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) {
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }
      anchors[index - 1]?.focus();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        ref={buttonRef}
        id={`${menuId}-button`}
        className="flex items-center gap-1 rounded-md text-sm font-semibold tracking-[0.14em] text-white/90 transition hover:text-[color:var(--dd-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() =>
          setIsOpen((prev) => {
            const next = !prev;
            if (!prev && next) focusFirstLink();
            return next;
          })
        }
        onKeyDown={handleButtonKeyDown}
      >
        <span>{group.label}</span>
        <ChevronDownIcon />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-20 pt-2">
          <div
            ref={panelRef}
            id={menuId}
            role="region"
            aria-labelledby={`${menuId}-button`}
            className="max-h-[70vh] min-w-72 overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(108,4,4,0.85)] p-3 shadow-[0_22px_65px_rgba(0,0,0,0.18)] backdrop-blur-md"
          >
            <div className="grid gap-1">
              {group.links.map((link, index) => (
                <a
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => handleLinkKeyDown(e, index)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-[color:var(--dd-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SiteHeader({ primaryNavigation, navigationGroups }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(108,4,4,0.96)] text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="/" className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="DevilDog Cybersecurity">
          <img
            src="/images/devildog/logo-white.png"
            alt="DevilDog Cybersecurity"
            width={250}
            height={40}
            fetchPriority="high"
            decoding="async"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 text-white xl:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md text-sm font-semibold tracking-[0.14em] text-white/90 transition hover:text-[color:var(--dd-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.label}
            </a>
          ))}

          {navigationGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}

          <a
            href="/contact"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold tracking-[0.14em] text-white transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:hidden"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[linear-gradient(180deg,var(--dd-red),var(--dd-red-deep))] px-6 pb-6 pt-4 text-white xl:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {primaryNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </a>
            ))}

            {navigationGroups.map((group) => (
              <details
                key={group.label}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/6 text-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <span>{group.label}</span>
                  <ChevronDownIcon />
                </summary>
                <div className="grid gap-1 px-2 pb-2">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </details>
            ))}

            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 rounded-full border border-white/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export { SiteHeader };
export default SiteHeader;
