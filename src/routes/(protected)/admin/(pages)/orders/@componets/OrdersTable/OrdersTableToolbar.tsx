import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import FormOrder from "../FormOrder/FormOrder";

export default function OrdersTableToolbar() {
  const handleOpenFormPerson = () => {
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Crear Orden
        </Text>
      ),
      children: <FormOrder />,
      radius: "lg",
      size: "lg"
    });
  };

  return (
    <Button leftSection={<IconPlus />} onClick={() => handleOpenFormPerson()}>
      CREAR
    </Button>
  );
}
