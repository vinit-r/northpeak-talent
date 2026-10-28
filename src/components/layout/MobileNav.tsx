import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { headerCta, headerLinks } from '@/config/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      // Keep focus inside the panel.
      if (event.key === 'Tab' && panel) {
        const focusable = panel.querySelectorAll<HTMLElement>('a, button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-fg hover:bg-surface"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#0B1120]/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col gap-2 overflow-y-auto border-l border-border bg-bg p-5 shadow-lift"
          >
            <div className="mb-2 flex items-center justify-between">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {headerLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-lg px-3 py-3 text-base font-medium hover:bg-surface',
                          isActive ? 'text-primary' : 'text-fg',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Button to={headerCta.to} className="mt-4 w-full">
              {headerCta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
