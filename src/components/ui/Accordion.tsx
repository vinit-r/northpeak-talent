import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Heading level for item titles (keeps the document outline correct). */
  headingLevel?: 'h3' | 'h4';
}

export function Accordion({ items, className, headingLevel: Heading = 'h3' }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className={cn('divide-y divide-border rounded-2xl border border-border bg-bg', className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.title}>
            <Heading className="text-base font-semibold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left hover:text-primary sm:px-6"
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 text-muted transition-transform motion-reduce:transition-none',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed text-muted sm:px-6"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
