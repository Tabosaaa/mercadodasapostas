import {z} from 'zod';

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    imageUrl: z.string(),
    quantity: z.number().int().nonnegative(),
});