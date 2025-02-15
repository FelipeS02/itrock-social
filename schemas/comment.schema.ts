import { userSchema } from './user.schema';

import { z } from 'zod';

export const commentSchema = z.object({
  text: z.string(),
  user: userSchema,
});
