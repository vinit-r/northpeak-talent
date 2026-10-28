import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: 'div' | 'li';
}

/** Subtle fade-up on scroll. Renders a static element when the visitor prefers reduced motion. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Motion = as === 'li' ? m.li : m.div;
  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
