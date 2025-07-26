import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, { message: "O nome não pode ser vazio." }),
  price: z.number().min(0, { message: "O preço deve ser um número positivo." }),
  imageFile: z.any().optional(),
  imageUrl: z.string().optional().nullable(),
  stock: z
    .number()
    .min(0, { message: "O estoque deve ser um número positivo." }),
});

export type ProductSchema = z.infer<typeof ProductSchema>;

export type ProductData = z.infer<typeof ProductSchema>;

export type ProductResponse = ProductData & {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
