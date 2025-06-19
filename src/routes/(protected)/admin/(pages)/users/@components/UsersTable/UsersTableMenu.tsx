import { User } from "@/@models/user.model";
import { Loader, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircle, IconCircleOff, IconUserSquareRounded } from "@tabler/icons-react";
import { useMemo } from "react";
import { toast } from "sonner";
import FormUser from "../FormUser/FormUser";
import { UserSchema } from "../FormUser/userSchema";
import { usePatchToggleUserStatus } from "./@services/patchToggleUserStatus.service";

interface ClientTableMenuProps {
  user: User;
}

export default function UserTableMenu({ user }: ClientTableMenuProps) {
  const isDisabled = useMemo(() => {
    return user.status === "INACTIVO";
  }, [user.status]);

  const { mutateAsync: toggleUserStatus, isPending } = usePatchToggleUserStatus();

  const handleEditUser = async () => {
    const userSchema: UserSchema = {
      user: {
        userID: user.userID,
        email: user.email,
        roleID: user.role.roleID
      },
      person: user.person
    };
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Editar Cliente
        </Text>
      ),
      children: <FormUser userSchema={userSchema} />,
      radius: "lg",
      size: "xl"
    });
  };

  const handleToggleUserStatus = () => {
    modals.openConfirmModal({
      title: "Cambiar estado del usuario",
      children: (
        <Text size="sm">¿Está seguro de que desea cambiar el estado del usuario {user.fullName}?</Text>
      ),
      labels: { confirm: "Cambiar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        toast.promise(toggleUserStatus(user.userID), {
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
        <Text size="sm">Editar usuario</Text>
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
