import { z } from "zod";
import { personInitialValues, personSchema } from "../FormPerson/personSchema";

export const createUserSchema = (userID?: number) => {
  const userSchema = z.object({
    userID: z.number().optional(),
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    person: personSchema.optional(),
    role: z.object({
      roleID: z.number().gt(0, { message: "Rol requerido" })
    })
  });
  if (userID && userID > 0) {
    return userSchema.extend({
      password: z.string().optional()
    });
  }
  return userSchema;
};

export const userSchema = createUserSchema();

export type UserSchema = z.infer<typeof userSchema>;

export const userInitialValues: UserSchema = {
  email: "",
  role: {
    roleID: -1
  },
  person: personInitialValues
};
