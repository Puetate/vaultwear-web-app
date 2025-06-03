import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";

export default function ColorSchemaSwitch() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const [checked, setChecked] = useState(computedColorScheme === "dark");

  const handleChangeColorScheme = (value: boolean) => {
    if (colorScheme) {
      setColorScheme(value ? "dark" : "light");
    }
    setChecked(value);
  };
  return (
    <Switch
      checked={checked}
      onChange={(event) => handleChangeColorScheme(event.currentTarget.checked)}
      color="white"
      size="md"
      label={`Tema ${checked ? "oscuro" : "claro"}`}
      thumbIcon={
        checked ? (
          <IconMoon size={12} color="var(--mantine-color-black)" stroke={3} />
        ) : (
          <IconSun size={12} color="var(--mantine-color-black)" stroke={3} />
        )
      }
    />
  );
}
