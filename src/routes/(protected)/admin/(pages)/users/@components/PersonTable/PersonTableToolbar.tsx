import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import FormPerson from "../FormPerson/FormPerson";

export default function PersonTableToolbar() {
  const handleOpenFormPerson = () => {
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Crear Persona
        </Text>
      ),
      children: <FormPerson />,
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
