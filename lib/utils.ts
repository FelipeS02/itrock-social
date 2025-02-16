import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
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

export const deleteFromIndex = <T>(arr: T[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export function checkFileType(file: File, types: string[]) {
  if (!file?.name) return false;

  const fileType = file.name.split('.').pop() ?? '';

  return types.includes(fileType);
}

export function formatISODate(isoString: string) {
  return format(parseISO(isoString), 'hh:mm a · dd MMM. yyyy');
}

export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return 'Buenos días';
  if (hour >= 12 && hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}
