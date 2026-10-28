import { Link } from 'react-router-dom';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

/** Swaps between the light and dark logo files with the theme class (no JS needed). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to={routes.home}
      className={cn('inline-flex shrink-0 items-center rounded-md', className)}
      aria-label={`${site.companyName} — home`}
    >
      <img
        src="/logo-light.svg"
        alt=""
        width={168}
        height={36}
        className="h-9 w-auto dark:hidden"
      />
      <img
        src="/logo-dark.svg"
        alt=""
        width={168}
        height={36}
        className="hidden h-9 w-auto dark:block"
      />
    </Link>
  );
}
