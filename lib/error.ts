import { z } from 'zod';

export function handleError(error: unknown) {
  if (error instanceof z.ZodError) {
    console.error(error.issues);

    return error.message;
  }

  if (error instanceof TypeError || error instanceof Error) {
    console.error(error.message);

    return error.message;
  }

  console.log(error);

  return error;
}
