import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useEffect } from "react";

export default function ColorSchemeManager() {
  const preferredColorScheme = useColorScheme();
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  return null;
}
