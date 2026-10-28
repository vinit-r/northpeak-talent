import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { headerCta, headerLinks } from '@/config/navigation';
import { isSampleMode } from '@/content/showcase';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-md transition-colors',
        scrolled ? 'border-border' : 'border-transparent',
      )}
    >
      {isSampleMode && (
        <div className="bg-amber-400 text-[#0F172A]">
          <p className="container-content flex items-center justify-center gap-2 py-1 text-center text-xs font-semibold">
            <Eye aria-hidden="true" className="h-3.5 w-3.5" />
            Preview — sample testimonials, clients and stats are shown. Not for public release.
          </p>
        </div>
      )}
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {headerLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-muted',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <Button to={headerCta.to} size="sm" className="hidden sm:inline-flex">
            {headerCta.label}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
