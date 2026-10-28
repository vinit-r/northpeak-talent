import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'primary' | 'accent';
}

const tones = {
  neutral: 'border-border bg-surface text-muted',
  primary: 'border-primary/20 bg-primary/10 text-primary',
  accent: 'border-accent/30 bg-accent/10 text-accent-fg',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
