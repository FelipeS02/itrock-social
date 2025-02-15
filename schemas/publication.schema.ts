import { commentSchema } from './comment.schema';
import { userSchema } from './user.schema';

import { z } from 'zod';

export const publicationSchema = z.object({
  user: userSchema,
  text: z.string(),
  likes: z.number(),
  images: z.array(z.string().url()),
  comments: z.array(commentSchema),
});
