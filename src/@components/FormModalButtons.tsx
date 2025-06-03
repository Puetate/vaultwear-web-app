import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";

interface FormModalButtonsProps {
  loading?: boolean;
  confirmOnly?: boolean;
}

export default function FormModalButtons({ loading, confirmOnly = false }: FormModalButtonsProps) {
  const handleOnClose = () => {
    modals.closeAll();
  };

  return confirmOnly ? (
    <div className="flex justify-end gap-4">
      <Button onClick={handleOnClose}>Aceptar</Button>
    </div>
  ) : (
    <div className="flex justify-end gap-4">
      <Button onClick={handleOnClose} disabled={loading} variant="outline" color="red">
        Cancelar
      </Button>
      <Button loading={loading} type="submit">
        Guardar
      </Button>
    </div>
  );
}
