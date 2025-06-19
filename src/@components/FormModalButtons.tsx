import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ReactNode } from "react";

interface FormModalButtonsProps {
  loading?: boolean;
  confirmOnly?: boolean;
  children?: ReactNode;
  modalID?: string;
}

export default function FormModalButtons({
  loading,
  confirmOnly = false,
  children,
  modalID
}: FormModalButtonsProps) {
  const handleOnClose = () => {
    if (modalID) {
      modals.close(modalID);
      return;
    }
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
      {children}
    </div>
  );
}
