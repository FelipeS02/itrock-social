import { commentSchema } from './comment.schema';
import { userSchema } from './user.schema';

import { z } from 'zod';

export const postSchema = z.object({
  id: z.number(),
  user: userSchema,
  text: z.string(),
  likes: z.array(userSchema),
  images: z.array(z.string().url()).default([]),
  comments: z.array(commentSchema),
  date: z.string().datetime(),
});

export const MAX_POST_CHARS = 200;

export const VALID_POST_IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

export const newPostFormSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'El post no puede estar vacio' })
    .max(MAX_POST_CHARS, {
      message: `El post no puede ser mas largo que ${MAX_POST_CHARS} caracteres`,
    }),
  images: z
    .array(z.string().url())
    .max(4, { message: 'No podes agregar mas de 4 fotos' })
    .default([]),
});
