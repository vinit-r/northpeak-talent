import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AsLink = BaseProps & { to: string; href?: never } & Omit<
    LinkProps,
    'to' | 'className' | 'children'
  >;
type AsAnchor = BaseProps & { href: string; to?: never } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;
type AsButton = BaseProps & { to?: never; href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >;

export type ButtonProps = AsLink | AsAnchor | AsButton;

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary shadow-sm hover:bg-primary/90',
  secondary: 'border border-field/60 bg-bg text-fg hover:border-primary hover:text-primary',
  ghost: 'text-fg hover:bg-surface',
  inverse: 'bg-white text-[#1E3A8A] hover:bg-white/90',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );

  if (rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<LinkProps, 'className'>)}>
        {children}
      </Link>
    );
  }
  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
