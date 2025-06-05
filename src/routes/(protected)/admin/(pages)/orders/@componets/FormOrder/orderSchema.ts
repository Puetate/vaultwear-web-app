import { dayjs } from "@/@lib/dayjs/dayjs";
import { Decimal } from "decimal.js";
import { z } from "zod";
import { personInitialValues, personSchema } from "../../../users/@components/FormPerson/personSchema";

export const createOrderSchema = (isEdit?: boolean) => {
  return z
    .object({
      order: z.object({
        orderID: z.number().optional(),
        orderDate: z.date(),
        deliveryDate: z.date(),
        deliveryAddress: z.string(),
        includeDelivery: z.boolean()
      }),
      details: z
        .array(
          z.object({
            orderDetailID: z.number().optional(),
            orderID: z.number().optional(),
            quantity: z.number().min(1),
            urlContent: z.string().optional(),
            contents: z.array(
              z.object({
                contentTypeID: z.number().gt(0, "El tipo de contenido es requerido"),
                contentTypeName: z.string().min(1, "El nombre del tipo de contenido es requerido"),
                urlContent: z.string().url("El URL del contenido debe ser válido"),
                description: z.string().max(200, "La descripción es muy larga").optional()
              })
            ),
            // .transform((val) => val.toString()),
            price: z
              .number()
              .refine((val) => {
                const decimalVal = new Decimal(val);
                return decimalVal.isPositive();
              }, "El precio es requerido")
              .transform((val) => new Decimal(val).toString()),
            orderDetailCode: z
              .string()
              .min(1, "El código es requerido")
              .max(100, "El código es muy largo"),
            description: z.string().max(100, "La descripción es muy larga")
          })
        )
        .min(1, "Se requiere al menos un detalle"),
      person: personSchema.optional()
    })
    .superRefine(({ order: { orderDate, deliveryDate } }, ctx) => {
      if (!isEdit) {
        if (orderDate > deliveryDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La fecha de la orden no puede ser mayor a la fecha de envió",
            path: ["order.orderDate"]
          });
        }
        if (deliveryDate < orderDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La fecha de envió no puede ser menor a la fecha de la orden",
            path: ["order.deliveryDate"]
          });
        }
        if (dayjs(dayjs(orderDate).format("YYYY-MM-DD")).isBefore(dayjs().format("YYYY-MM-DD"))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La fecha de la orden no puede ser menor a la fecha actual",
            path: ["order.orderDate"]
          });
        }
      }
    });
};

const orderSchema = createOrderSchema();
export type OrderSchema = z.input<typeof orderSchema> | z.output<typeof orderSchema>;

export const defaultDetail = {
  contentTypesID: -1,
  quantity: 1,
  urlContent: "",
  price: 25,
  orderDetailCode: "",
  contents: []
};

export const orderInitialValues: OrderSchema = {
  order: {
    orderDate: new Date(),
    deliveryDate: new Date(),
    deliveryAddress: "",
    includeDelivery: false
  },
  details: [],
  person: personInitialValues
};
