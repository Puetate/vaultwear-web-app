import { PLAY_STORE_URL } from "@/@constants/playsStore.constants";
import {
  Accordion,
  Checkbox,
  Group,
  NumberInput,
  Radio,
  Select,
  Slider,
  Text,
  TextInput
} from "@mantine/core";
import { useField, useForm, zodResolver } from "@mantine/form";
import { useShallowEffect } from "@mantine/hooks";
import { Options } from "qr-code-styling";
import { useEffect, useState } from "react";
import { useQRContext } from "../../../@providers/qrProvider";
import ColorTypeOption from "./ColorTypeOption";
import {
  cornerDotTypes,
  defaultTypeNumber,
  dotTypes,
  errorCorrectionLevels,
  getQrImagePath,
  qrOptionsDefault,
  QROptionsSchema,
  qrOptionsSchema
} from "./qrOptionsSchema";

interface QROptionsProps {
  onChange?: (values: Partial<Options>) => void;
  initialValues?: Partial<QROptionsSchema>;
}

export default function QROptions({ onChange, initialValues }: QROptionsProps) {
  const [disableData, setDisableData] = useState(false);
  const qrContext = useQRContext();

  const form = useForm({
    validate: zodResolver(qrOptionsSchema),
    initialValues: { ...qrOptionsDefault, ...initialValues },
    onValuesChange: (values) => {
      onChange?.(values as Partial<Options>);
      if (qrContext?.orderDetail.detailID) {
        qrContext.setOrderDetail({
          qrJson: JSON.stringify(values)
        });
      }
    }
  });

  const image = useField({
    mode: "uncontrolled",
    initialValue: "dark",
    onValueChange: (value) => {
      form.setValues({
        image: getQrImagePath(value as "dark" | "light")
      });
    }
  });

  const handleChangeQRContext = () => {
    if (!qrContext || !qrContext.orderDetail.detailID) {
      form.setValues({
        data: "",
        qrOptions: {
          ...form.values.qrOptions,
          typeNumber: 0
        }
      });
      setDisableData(false);
      return;
    }
    const { qrJson, code, detailIdentifier: detailType } = qrContext?.orderDetail;
    let qrOptions = {};
    if (qrJson) {
      qrOptions = typeof qrJson === "string" ? JSON.parse(qrJson) : qrJson;
    }
    form.setValues({
      ...qrOptions,
      data: `${PLAY_STORE_URL}&${detailType}=${code}`,
      qrOptions: {
        ...form.values.qrOptions,
        typeNumber: defaultTypeNumber.large
      }
    });

    setDisableData(true);
  };

  useShallowEffect(() => {
    handleChangeQRContext();
  }, [qrContext?.orderDetail]);

  useEffect(() => {
    onChange?.(form.values as Partial<Options>);
  }, []);

  return (
    <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto">
      <Accordion>
        <Accordion.Item value="main">
          <Accordion.Control>Opciones Principales</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                disabled={disableData}
                label="Contenido (URL)"
                placeholder="https://www.url.com/"
                {...form.getInputProps("data")}
              />
              <NumberInput label="Ancho" {...form.getInputProps("width")} />
              <NumberInput label="Altura" {...form.getInputProps("height")} />
              <NumberInput label="Margen" {...form.getInputProps("margin")} />
              <Select
                label="Logo"
                data={[
                  { value: "dark", label: "Oscuro" },
                  { value: "light", label: "Claro" }
                ]}
                {...image.getInputProps()}
                key={image.key}
              />
              <Radio.Group label="Forma" {...form.getInputProps("shape")}>
                <Group>
                  <Radio value="circle" label="Circular" />
                  <Radio value="square" label="Cuadrada" />
                </Group>
              </Radio.Group>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="dots">
          <Accordion.Control>Opciones de Puntos</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Tipo" data={dotTypes} {...form.getInputProps("dotsOptions.type")} />
              <ColorTypeOption field="dotsOptions" form={form} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="square">
          <Accordion.Control>Opciones de Cuadrados de las esquinas</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tipo"
                data={cornerDotTypes}
                {...form.getInputProps("cornersSquareOptions.type")}
              />
              <ColorTypeOption field="cornersSquareOptions" form={form} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="dot-corner">
          <Accordion.Control>Opciones de Puntos en las esquinas</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tipo"
                data={cornerDotTypes}
                {...form.getInputProps("cornersDotOptions.type")}
              />
              <ColorTypeOption field="cornersDotOptions" form={form} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="background">
          <Accordion.Control>Opciones de Fondo</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <ColorTypeOption field="backgroundOptions" form={form} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="image">
          <Accordion.Control>Opciones de Imagen</Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                step={0.1}
                label="Tamaño"
                {...form.getInputProps("imageOptions.imageSize")}
                min={0}
                max={1}
              />
              <NumberInput label="Margen" {...form.getInputProps("imageOptions.margin")} />
              <Checkbox
                label="Ocultar fondo"
                {...form.getInputProps("imageOptions.hideBackgroundDots", { type: "checkbox" })}
              />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item value="download">
          <Accordion.Control>Opciones de QR </Accordion.Control>
          <Accordion.Panel>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Nivel de corrección"
                data={errorCorrectionLevels}
                {...form.getInputProps("qrOptions.errorCorrectionLevel")}
              />
              <div>
                <Text>Número</Text>
                <Slider
                  {...form.getInputProps("qrOptions.typeNumber")}
                  min={
                    qrContext?.orderDetail.detailID ? defaultTypeNumber.large : defaultTypeNumber.normal
                  }
                  max={40}
                />
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
