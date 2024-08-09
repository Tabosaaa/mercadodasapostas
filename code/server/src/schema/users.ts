import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    isAdm: z.boolean(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});