import { userSchema } from './user.schema';

import { z } from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  user: userSchema,
  images: z.array(z.string().url()).optional().default([]),
});
