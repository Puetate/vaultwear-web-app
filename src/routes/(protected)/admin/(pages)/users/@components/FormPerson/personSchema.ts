import { phoneRegex } from "@/@lib/utils";
import { z } from "zod";

export const personSchema = z.object({
  personID: z.number().optional(),
  name: z.string().min(1, { message: "Nombre requerido" }),
  surname: z.string().min(1, { message: "Apellido requerido" }),
  phone: z.string().regex(phoneRegex, { message: "Teléfono inválido" }),
  address: z
    .string()
    .min(1, { message: "Dirección requerida" })
    .max(100, { message: "Dirección muy larga" }),
  identification: z.string()
});

export type PersonSchema = z.infer<typeof personSchema>;

export const personInitialValues: PersonSchema = {
  name: "",
  surname: "",
  phone: "",
  address: "",
  identification: ""
};
