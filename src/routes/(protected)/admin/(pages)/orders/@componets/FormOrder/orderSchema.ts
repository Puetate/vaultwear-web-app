import { dayjs } from "@/@lib/dayjs/dayjs";
import { Decimal } from "decimal.js";
import { z } from "zod";
import { personInitialValues, personSchema } from "../../../users/@components/FormPerson/personSchema";

export const orderSchema = z
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
          contentTypeID: z.number().gt(0, "El tipo de contenido es requerido"),
          quantity: z.number().min(1),
          urlContent: z.string().optional(),
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
          description: z
            .string()
            .min(1, "La descripción es requerida")
            .max(100, "La descripción es muy larga")
        })
      )
      .min(1, "Se requiere al menos un detalle"),
    person: personSchema.optional()
  })
  .superRefine(({ order: { orderDate, deliveryDate } }, ctx) => {
    if (orderDate > deliveryDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha de la orden no puede ser mayor a la fecha de envió",
        path: ["orderDate"]
      });
    }
    if (deliveryDate < orderDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha de envió no puede ser menor a la fecha de la orden",
        path: ["deliveryDate"]
      });
    }
    // if (dayjs(orderDate).format("DD-MM-YYYY") === dayjs(deliveryDate).format("DD-MM-YYYY")) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "La fecha de la orden no puede ser igual a la fecha de envió",
    //     path: ["orderDate"]
    //   });
    // }
    if (dayjs(dayjs(orderDate).format("YYYY-MM-DD")).isBefore(dayjs().format("YYYY-MM-DD"))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha de la orden no puede ser menor a la fecha actual",
        path: ["initDate"]
      });
    }
  });

export type OrderSchema = z.input<typeof orderSchema> | z.output<typeof orderSchema>;

export const defaultDetail = {
  contentTypesID: -1,
  quantity: 1,
  urlContent: "",
  price: 25,
  orderDetailCode: ""
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
