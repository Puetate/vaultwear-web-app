import { phoneRegex } from "@/@lib/utils";
import { z } from "zod";

export const createSchema = (isEdit: boolean) => {
  const user = z.object({
    userID: z.number().optional(),
    email: z.string().email({ message: "Correo inválido" }),
    password: isEdit
      ? z.string().optional()
      : z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    roleID: z.number().gt(0, { message: "Rol requerido" })
  });
  const userSchema = z.object({
    user,
    person: z.object({
      personID: z.number().optional(),
      name: z.string().min(1, { message: "Nombre requerido" }),
      surname: z.string().min(1, { message: "Apellido requerido" }),
      phone: z.string().regex(phoneRegex, { message: "Teléfono inválido" }),
      address: z
        .string()
        .min(1, { message: "Dirección requerida" })
        .max(100, { message: "Dirección muy larga" }),
      identification: z.string()
    })
  });

  return userSchema;
};

export const createUserSchema = createSchema(false);
export const editUserSchema = createSchema(true);

export type UserSchema = z.output<typeof createUserSchema>;

export const userInitialValues: UserSchema = {
  user: {
    email: "",
    password: "",
    roleID: -1
  },
  person: {
    name: "",
    surname: "",
    phone: "",
    address: "",
    identification: ""
  }
};
