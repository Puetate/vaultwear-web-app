import { Select, SelectProps } from "@mantine/core";

interface DataSelectProps<T> extends Omit<SelectProps, "value" | "onChange" | "data"> {
  value?: number;
  onChange?: (value: number) => void;
  data: T[];
  defaultLabel?: string;
  defaultOptionValue?: string;
  disabledDefault?: boolean;
  accessorLabel: keyof T;
  accessorValue: keyof T;
}

export default function DataSelect<T>(props: DataSelectProps<T>) {
  const {
    value,
    onChange,
    data,
    accessorLabel,
    accessorValue,
    defaultOptionValue = "-1",
    disabledDefault = false,
    defaultValue,
    defaultLabel = "Seleccione una opción",
    ...otherProps
  } = props;

  return (
    <Select
      value={value?.toString() ?? defaultValue?.toString() ?? defaultOptionValue?.toString()}
      onChange={(value) => onChange?.(Number(value) || 0)}
      data={[
        {
          label: defaultLabel,
          value: defaultOptionValue,
          disabled: !disabledDefault
        },
        ...data.map((d) => ({
          label: d[accessorLabel] as string,
          value: (d[accessorValue] as number).toString()
        }))
      ]}
      {...otherProps}
    />
  );
}
