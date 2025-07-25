import z from "zod";

export const LoginSchema = z.object({
  mail: z
    .string()
    .min(1, { message: "O email não pode ser vazio." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "A senha não pode estar vazia." })
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export type LoginData = z.infer<typeof LoginSchema>;
