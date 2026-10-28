import { cn, initials } from '@/lib/utils';

interface AvatarProps {
  /** Text the initials are generated from. */
  text: string;
  photo?: string;
  size?: 'md' | 'lg';
  className?: string;
}

/** Initials avatar (no stock faces). Uses a photo only when one is provided. */
export function Avatar({ text, photo, size = 'md', className }: AvatarProps) {
  const dimension = size === 'lg' ? 'h-16 w-16 text-xl' : 'h-11 w-11 text-sm';
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn('rounded-full object-cover', dimension, className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-white dark:text-[#0B1120]',
        dimension,
        className,
      )}
    >
      {initials(text)}
    </span>
  );
}
