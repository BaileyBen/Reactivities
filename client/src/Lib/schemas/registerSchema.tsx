import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

export const registerSchema = z.object({
    email: z.email(),
    displayName: requiredString('displayName'),
    password: requiredString('password')
  })

export type RegisterSchema = z.infer<typeof registerSchema>;
