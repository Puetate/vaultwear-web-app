import { Person } from "@/@models/user.model";
import { Loader, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconUserSquareRounded } from "@tabler/icons-react";
import { useMemo } from "react";
import { toast } from "sonner";
import FormPerson from "../FormPerson/FormPerson";
import { usePatchTogglePersonStatus } from "./@services/patchTogglePersonStatus.service";

interface PersonTableMenuProps {
  person: Person;
}

export default function PersonTableMenu({ person }: PersonTableMenuProps) {
  const isDisabled = useMemo(() => {
    return person.status === "INACTIVO";
  }, [person.status]);

  const { mutateAsync: togglePersonStatusMutation, isPending } = usePatchTogglePersonStatus();

  const handleEditUser = async () => {
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Editar Persona
        </Text>
      ),
      children: <FormPerson initialValues={person} />,
      radius: "lg",
      size: "md"
    });
  };

  const handleToggleUserStatus = () => {
    modals.openConfirmModal({
      title: "Cambiar estado de la persona",
      children: (
        <Text size="sm">
          ¿Está seguro de que desea cambiar el estado de {person.name} {person.surname}?
        </Text>
      ),
      labels: { confirm: "Cambiar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        toast.promise(togglePersonStatusMutation(person.personID), {
          loading: "Cambiando estado...",
          success: "Estado cambiado correctamente"
        });
      }
    });
  };

  return (
    <Menu.Dropdown>
      <Menu.Label>Opciones</Menu.Label>
      <Menu.Item leftSection={<IconUserSquareRounded size="20px" />} onClick={handleEditUser}>
        <Text size="sm">Editar persona</Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Zona de peligro</Menu.Label>
      <Menu.Item
        disabled={isPending}
        leftSection={
          isPending ? (
            <Loader size="sm" />
          ) : isDisabled ? (
            <IconCircle size="20px" />
          ) : (
            <IconCircleOff size="20px" />
          )
        }
        onClick={handleToggleUserStatus}
      >
        {isDisabled ? "Habilitar" : "Deshabilitar"}
      </Menu.Item>
    </Menu.Dropdown>
  );
}
