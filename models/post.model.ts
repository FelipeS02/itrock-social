import { newPostFormSchema, postSchema } from '@rock/schemas/post.schema';

import { z } from 'zod';

export type Post = z.infer<typeof postSchema>;

export type NewPostForm = z.infer<typeof newPostFormSchema>;
