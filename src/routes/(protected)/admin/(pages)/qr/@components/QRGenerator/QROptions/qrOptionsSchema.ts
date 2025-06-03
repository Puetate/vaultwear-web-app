import {
  CornerDotType as CDT,
  DotType as DT,
  ErrorCorrectionLevel as ECL,
  Mode as M
} from "qr-code-styling";
import { z } from "zod";

export const dotTypes: DT[] = ["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"];
export const cornerDotTypes: CDT[] = ["dot", ...dotTypes];
export const qrModes: M[] = ["Numeric", "Alphanumeric", "Byte", "Kanji"];
export const errorCorrectionLevels: ECL[] = ["L", "M", "Q"];

// Enum-like values
const DotType = z.enum(dotTypes as [string, ...string[]]);
const CornerDotType = z.enum(cornerDotTypes as [string, ...string[]]);
const GradientType = z.enum(["radial", "linear"]);
const DrawType = z.enum(["canvas", "svg"]);
const ShapeType = z.enum(["square", "circle"]);
const TypeNumber = z.number().int().min(0).max(40);
const ErrorCorrectionLevel = z.enum(errorCorrectionLevels as [string, ...string[]]);
const Mode = z.enum(qrModes as [string, ...string[]]);

// Gradient schema
const Gradient = z.object({
  type: GradientType,
  rotation: z.number().optional(),
  colorStops: z.array(
    z.object({
      offset: z.number(),
      color: z.string()
    })
  )
});

// Options schema
export const qrOptionsSchema = z.object({
  type: DrawType.optional(),
  shape: ShapeType.optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  margin: z.number().optional(),
  data: z.string().optional(),
  image: z.string().optional(),
  qrOptions: z
    .object({
      typeNumber: TypeNumber.optional(),
      mode: Mode.optional(),
      errorCorrectionLevel: ErrorCorrectionLevel.optional()
    })
    .optional(),
  imageOptions: z
    .object({
      hideBackgroundDots: z.boolean().optional(),
      imageSize: z.number().optional(),
      margin: z.number().optional(),
      saveAsBlob: z.boolean().optional(),
      crossOrigin: z.string().optional()
    })
    .optional(),
  dotsOptions: z
    .object({
      type: DotType.optional(),
      color: z.string().optional(),
      gradient: Gradient.optional()
    })
    .optional(),
  cornersSquareOptions: z
    .object({
      type: CornerDotType.optional(),
      color: z.string().optional(),
      gradient: Gradient.optional()
    })
    .optional(),
  cornersDotOptions: z
    .object({
      type: CornerDotType.optional(),
      color: z.string().optional(),
      gradient: Gradient.optional()
    })
    .optional(),
  backgroundOptions: z
    .object({
      round: z.number().optional(),
      color: z.string().optional(),
      gradient: Gradient.optional()
    })
    .optional()
});

export type QROptionsSchema = z.infer<typeof qrOptionsSchema>;

type QRGradientSchema = z.infer<typeof Gradient>;

export const qrGradientDefault: QRGradientSchema = {
  type: "linear",
  rotation: 0,
  colorStops: [
    { offset: 0, color: "#000000" },
    { offset: 1, color: "#000000" }
  ]
};

export const defaultTypeNumber = {
  normal: 0,
  large: 9
};

export const getQrImagePath = (schema: "dark" | "light") => {
  return `${window.location.origin}/${schema === "dark" ? "logo-dark.svg" : "logo.svg"}`;
};

export const qrOptionsDefault: QROptionsSchema = {
  shape: "square",
  width: 300,
  height: 300,
  margin: 0,
  data: "",
  type: "svg",
  image: getQrImagePath("dark"),
  qrOptions: {
    typeNumber: defaultTypeNumber.normal,
    mode: "Byte",
    errorCorrectionLevel: "Q"
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: "anonymous"
  },
  dotsOptions: {
    type: "square",
    color: "#000000"
  },
  cornersSquareOptions: {
    type: "square",
    color: "#000000"
  },
  cornersDotOptions: {
    type: "dot",
    color: "#000000"
  },
  backgroundOptions: {
    color: "#ffffff"
  }
};
