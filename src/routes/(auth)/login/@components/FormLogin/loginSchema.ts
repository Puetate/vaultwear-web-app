import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .email("Correo electrónico inválido")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "La contraseña es obligatoria")
    .max(8, "La contraseña no puede tener más de 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginInitialValues: LoginSchema = {
  email: "",
  password: "",
};
