import { Order, OrderDetail } from "@/@models/order.model";
import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { toast } from "sonner";
import OrdersTable from "../../../../orders/@componets/OrdersTable/OrdersTable";
import { useQRContext } from "../../../@providers/qrProvider";
import { usePatchOrderDetail } from "./@services/patchOrderDetail.service";
import OrderDetailSelector from "./OrderDetailSelector";

export default function OrderSelector() {
  const qrContext = useQRContext();

  const { mutateAsync: editOrderDetailMutation, isPending } = usePatchOrderDetail();

  const handleSelectedOrderDetail = (orderDetail: OrderDetail, order: Order) => {
    if (!qrContext) return;
    qrContext.setOrderDetail({
      orderDetailCode: orderDetail.orderDetailCode,
      orderDetailID: orderDetail.orderDetailID,
      qrJson: orderDetail.qrJson as string | null,
      text: `${orderDetail.orderDetailCode} - ${order.person.fullName} - ${orderDetail.description}`
    });
    modals.closeAll();
  };

  const handleSelectedOrder = (order: Order) => {
    modals.open({
      title: "Seleccione un detalle de orden",
      children: (
        <OrderDetailSelector
          client={order.person.fullName}
          orderDetails={order.orderDetails}
          onSelectOrderDetail={(od) => handleSelectedOrderDetail(od, order)}
        />
      )
    });
  };

  const handleOnClick = () => {
    modals.open({
      title: "Seleccione una orden",
      children: <OrdersTable enableRowSelection={true} onRowSelectionChange={handleSelectedOrder} />,
      size: "xl"
    });
  };

  const handleSave = () => {
    if (!qrContext) return;
    const { orderDetailID, qrJson } = qrContext.orderDetail;
    toast.promise(
      editOrderDetailMutation({
        data: { qrJson },
        orderDetailID
      }),
      {
        loading: "Guardando...",
        success: () => {
          qrContext.clearOrderDetail();
          return "Guardado con éxito";
        }
      }
    );
  };

  const handleCancel = () => {
    if (!qrContext) return;
    qrContext.clearOrderDetail();
  };

  return Boolean(qrContext?.orderDetail.orderDetailID) ? (
    <div className="flex gap-4">
      <Button loading={isPending} onClick={handleSave} className="w-[50%]" bg="green">
        Guardar
      </Button>
      <Button
        variant="outline"
        disabled={isPending}
        onClick={handleCancel}
        className="w-[50%]"
        color="red"
      >
        Cancelar
      </Button>
    </div>
  ) : (
    <Button onClick={handleOnClick} className="w-[50%]">
      Asignar a Orden
    </Button>
  );
}
