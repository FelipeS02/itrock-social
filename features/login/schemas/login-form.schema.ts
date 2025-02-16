import { z } from 'zod';

const emailDomainRegex = /^[a-zA-Z0-9._%+-]+@itrocksweb\.com$/;

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'El formato del email no es valido.' })
    .regex(emailDomainRegex, 'El e-mail no pertenece a ITROCK.'),
  password: z
    .string()
    .min(1, { message: 'La contraseña no puede estar vacia' }),
});
