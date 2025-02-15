import z from 'zod';

const hexRegex = /#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;

export const userSchema = z.object({
  email: z.string(),
  username: z.string(),
  role: z.object({
    name: z.string(),
    background: z.string().regex(hexRegex),
    foreground: z.string().regex(hexRegex),
  }),
});
