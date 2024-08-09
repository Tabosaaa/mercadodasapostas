import {z} from 'zod'

export const gmailProductSchema = z.object({
    email: z.string().email(),
    subEmail: z.string().email(),
    password: z.string(),
    productId: z.number().int().positive(),   
});
