import { publicationSchema } from '@rock/schemas/publication.schema';

import { z } from 'zod';

export type Publication = z.infer<typeof publicationSchema>;
