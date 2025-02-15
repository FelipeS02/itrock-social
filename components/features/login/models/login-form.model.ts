import { loginFormSchema } from '../schemas/login-form.schema';

import { z } from 'zod';

export type LoginForm = z.infer<typeof loginFormSchema>;
