import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import FormUser from "../FormUser/FormUser";

export default function UserTableToolbar() {
  const handleOpenFormUser = async () => {
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Crear Usuario
        </Text>
      ),
      children: <FormUser />,
      radius: "lg",
      size: "lg"
    });
  };

  return (
    <Button leftSection={<IconPlus />} onClick={() => handleOpenFormUser()}>
      CREAR
    </Button>
  );
}
