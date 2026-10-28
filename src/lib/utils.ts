import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Senior Java Engineer" → "SJ"; "Lalit" → "L". */
export function initials(text: string, max = 2) {
  return text
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, max)
    .map((word) => word[0]!.toUpperCase())
    .join('');
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const whatsappHref = (number: string, message?: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Safe localStorage access — storage can be unavailable or throw (private mode, blocked). */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};

export const formatAddress = (parts: (string | undefined)[]) => parts.filter(Boolean).join(', ');
