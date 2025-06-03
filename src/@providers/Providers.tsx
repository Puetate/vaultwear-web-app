import { theme } from "@/@theme/theme";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import "dayjs/locale/es";
import { Toaster } from "sonner";
import ColorSchemeManager from "../@components/ColorSchemeManager";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={theme}>
      <ColorSchemeManager />
      <DatesProvider settings={{ locale: "es", timezone: "America/Guayaquil" }}>
        <ModalsProvider labels={{ cancel: "Cancelar", confirm: "Aceptar" }}>
          <Toaster richColors position="bottom-center" />
          {children}
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
