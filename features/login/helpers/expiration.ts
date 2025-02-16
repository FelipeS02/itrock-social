import { addHours } from 'date-fns';

export const getExpirationTime = (hours: number) =>
  addHours(new Date(), hours).getTime();
