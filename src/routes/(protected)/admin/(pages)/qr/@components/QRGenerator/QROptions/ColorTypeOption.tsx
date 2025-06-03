import { AngleSlider, Checkbox, ColorInput, Group, Radio, Text } from "@mantine/core";
import { useField, UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { qrGradientDefault, qrOptionsDefault, QROptionsSchema } from "./qrOptionsSchema";

interface ColorTypeOptionProps {
  form: UseFormReturnType<QROptionsSchema>;
  field: keyof Omit<
    QROptionsSchema,
    "shape" | "width" | "height" | "margin" | "data" | "type" | "qrOptions" | "imageOptions" | "image"
  >;
}

export default function ColorTypeOption({ form, field }: ColorTypeOptionProps) {
  const colorType = useField({
    initialValue: "single"
  });

  const freeAngle = useField({
    type: "checkbox",
    initialValue: false
  });

  useEffect(() => {
    form.setValues({
      [field]: {
        ...form.getValues()[field],
        gradient: colorType.getValue() === "single" ? undefined : qrGradientDefault,
        color: colorType.getValue() === "single" ? qrOptionsDefault[field]?.color : undefined
      }
    });
  }, [colorType.getValue()]);

  return (
    <>
      <Radio.Group className="col-span-2" label="Tipo de color" {...colorType.getInputProps()}>
        <Group>
          <Radio value="single" label="Color único" />
          <Radio value="gradient" label="Gradiente" />
        </Group>
      </Radio.Group>
      {colorType.getValue() === "single" ? (
        <ColorInput label="Color" placeholder="#000" {...form.getInputProps(`${field}.color`)} />
      ) : (
        <>
          <Radio.Group
            className="col-span-2"
            label="Tipo de color"
            {...form.getInputProps(`${field}.gradient.type`)}
          >
            <Group>
              <Radio value="linear" label="Linar" />
              <Radio value="radial" label="Radial" />
            </Group>
          </Radio.Group>
          <ColorInput
            label="Color 1"
            placeholder="#000"
            {...form.getInputProps(`${field}.gradient.colorStops.0.color`)}
          />
          <ColorInput
            label="Color 2"
            placeholder="#000"
            {...form.getInputProps(`${field}.gradient.colorStops.1.color`)}
          />
          <div className="flex flex-col gap-2">
            <Text>Rotación</Text>
            <AngleSlider
              size={100}
              restrictToMarks={!freeAngle.getValue()}
              formatLabel={(value) => `${value}°`}
              marks={[
                { value: 0 },
                { value: 45 },
                { value: 90 },
                { value: 135 },
                { value: 180 },
                { value: 225 },
                { value: 270 },
                { value: 315 }
              ]}
              {...form.getInputProps(`${field}.gradient.rotation`)}
            />
          </div>
          <div className="flex items-center">
            <Checkbox label="Angulo libre" {...freeAngle.getInputProps()} />
          </div>
        </>
      )}
    </>
  );
}
