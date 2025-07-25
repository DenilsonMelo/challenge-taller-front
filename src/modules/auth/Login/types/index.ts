import z from "zod";

export const loginSchema = z.object({
  mail: z
    .string()
    .min(1, { message: "O email não pode ser vazio." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "A senha não pode estar vazia." })
});

export type loginSchema = z.infer<typeof loginSchema>;
