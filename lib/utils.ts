import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @ms Miliseconds to resolve
 * @summary Simulate api requests (only for ux testing)
 */
export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
