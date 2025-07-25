import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode ser vazio." }),
  mail: z.string().min(1, { message: "O email não pode ser vazio." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "A senha não pode estar vazia." }),
  userType: z.enum(["ADMIN", "CLIENT"]).default("CLIENT").optional()
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export type RegisterData = z.infer<typeof RegisterSchema>;
