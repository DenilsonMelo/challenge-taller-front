import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode ser vazio." }),
  mail: z.string().min(1, { message: "O email não pode ser vazio." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "A senha não pode estar vazia." }),
});

export type registerSchema = z.infer<typeof registerSchema>;
