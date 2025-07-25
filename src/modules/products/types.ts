import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, { message: "O nome não pode ser vazio." }),
  price: z.coerce
    .number()
    .min(0, { message: "O preço deve ser um número positivo." }),
  imageFile: z.file(),
  stock: z.coerce
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
