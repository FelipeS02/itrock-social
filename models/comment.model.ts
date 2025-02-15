import { commentSchema } from '@rock/schemas/comment.schema';

import { z } from 'zod';

export type Comment = z.infer<typeof commentSchema>;
