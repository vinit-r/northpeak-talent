import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li';
  interactive?: boolean;
}

export function Card({ as: Tag = 'div', interactive, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-bg p-6 shadow-card',
        interactive &&
          'transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift motion-reduce:transform-none',
        className,
      )}
      {...props}
    />
  );
}
