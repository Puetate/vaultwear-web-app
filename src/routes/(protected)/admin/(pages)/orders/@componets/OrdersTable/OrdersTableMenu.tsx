import { dayjs } from "@/@lib/dayjs/dayjs";
import { Order } from "@/@models/order.model";
import { Person } from "@/@models/user.model";
import { Loader, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconCircle, IconCircleOff, IconShirt, IconX } from "@tabler/icons-react";
import { useMemo } from "react";
import { toast } from "sonner";
import FormOrder from "../FormOrder/FormOrder";
import { OrderSchema } from "../FormOrder/orderSchema";
import { usePatchOrder } from "./@services/patchOrder.service";
import { usePatchToggleOrderStatus } from "./@services/patchToggleOrderStatus.service";

interface OrdersTableMenuProps {
  order: Order;
}

export default function OrdersTableMenu({ order }: OrdersTableMenuProps) {
  const isDisabled = useMemo(() => {
    return order.status === "INACTIVO";
  }, [order.status]);

  const isOrderCompleted = useMemo(() => {
    return order.completed === "COMPLETADA";
  }, [order.completed]);

  const { mutateAsync: editOrderMutation } = usePatchOrder();

  const { mutateAsync: toggleOrderStatus, isPending } = usePatchToggleOrderStatus();

  const handleEditOrder = async () => {
    const orderSchema: OrderSchema = {
      order: {
        orderID: order.orderID,
        deliveryAddress: order.deliveryAddress,
        deliveryDate: dayjs(order.deliveryDate).toDate(),
        includeDelivery: order.includeDelivery === "SI",
        orderDate: dayjs(order.orderDate).toDate(),
        userID: order.user.userID
      },
      details: order.orderDetails.map((detail) => ({
        orderDetailID: detail.orderDetailID,
        orderID: order.orderID,
        orderDetailCode: detail.orderDetailCode,
        quantity: detail.quantity,
        price: detail.price,
        description: detail.description,
        contents: detail.contents
      }))
    };
    const person: Person = {
      personID: order.person.personID,
      name: order.person.name,
      surname: order.person.surname,
      identification: order.person.identification,
      address: order.person.address,
      phone: order.person.phone
    };
    modals.open({
      title: (
        <Text size="lg" className="font-bold">
          Editar Orden
        </Text>
      ),
      children: <FormOrder initialValues={orderSchema} person={person} />,
      radius: "lg",
      size: "lg"
    });
  };

  const handleMarkAsCompleted = () => {
    toast.promise(
      editOrderMutation({
        orderID: order.orderID,
        completed: !isOrderCompleted
      }),
      {
        loading: `Marcando orden como ${isOrderCompleted ? "PENDIENTE" : "COMPLETADA"}...`,
        success: `Orden marcada como ${isOrderCompleted ? "PENDIENTE" : "COMPLETADA"} correctamente`
      }
    );
  };

  const handleToggleOrderStatus = () => {
    modals.openConfirmModal({
      children: (
        <Text size="sm">
          ¿Estás seguro de que deseas {isDisabled ? "habilitar" : "deshabilitar"} esta orden?
        </Text>
      ),
      onConfirm: async () => {
        toast.promise(toggleOrderStatus(order.orderID), {
          loading: `Cambiando estado de la orden...`,
          success: `Orden ${isDisabled ? "habilitada" : "deshabilitada"} correctamente`
        });
      }
    });
  };

  return (
    <Menu.Dropdown>
      <Menu.Label>Opciones</Menu.Label>
      <Menu.Item leftSection={<IconShirt size="20px" />} onClick={handleEditOrder}>
        <Text size="sm">Editar Orden</Text>
      </Menu.Item>
      <Menu.Item
        leftSection={isOrderCompleted ? <IconX size="20px" /> : <IconCheck size="20px" />}
        onClick={handleMarkAsCompleted}
      >
        <Text size="sm">Marcar como {isOrderCompleted ? "PENDIENTE" : "COMPLETADA"}</Text>
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
        onClick={handleToggleOrderStatus}
      >
        {isDisabled ? "Habilitar" : "Deshabilitar"}
      </Menu.Item>
    </Menu.Dropdown>
  );
}
