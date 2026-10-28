import type { IconName } from '@/content/types';
import { icons } from '@/lib/icons';
import { cn } from '@/lib/utils';

/** Decorative icon tile used on cards. */
export function IconTile({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary',
        className,
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}
