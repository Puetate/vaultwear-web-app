import { Order, OrderDetail } from "@/@models/order.model";
import { Button, Select } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { toast } from "sonner";
import OrdersTable from "../../../../orders/@componets/OrdersTable/OrdersTable";
import { DetailIdentifier, detailTypes, useQRContext } from "../../../@providers/qrProvider";
import { qrOptionsDefault } from "../QROptions/qrOptionsSchema";
import { usePatchLoyaltyCardDetail } from "./@services/patchLoyaltyCardDetail.service";
import { usePatchOrderDetail } from "./@services/patchOrderDetail.service";
import OrderDetailSelector from "./OrderDetailSelector";

export default function OrderSelector() {
  const [detailIdentifier, setDetailIdentifier] = useState<DetailIdentifier>("orderDetailCode");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const qrContext = useQRContext();

  const { mutateAsync: editOrderDetailMutation, isPending } = usePatchOrderDetail();
  const { mutateAsync: editLoyaltyCardDetail, isPending: isPendingLoyaltyCardDetail } =
    usePatchLoyaltyCardDetail();

  const handleChangeSelectedDetailType = (value: string | null) => {
    if (!value) return;
    setDetailIdentifier(value as DetailIdentifier);
    if (!qrContext || !selectedOrder) return;
    const code =
      value === "orderDetailCode"
        ? selectedOrder.orderDetailCode
        : selectedOrder.loyaltyCardDetail.claimCode;
    const qrJson =
      value === "orderDetailCode" ? selectedOrder.qrJson : selectedOrder.loyaltyCardDetail.qrJson;
    qrContext.setOrderDetail({
      detailID: selectedOrder.loyaltyCardDetail.loyaltyCardDetailID,
      detailIdentifier: value as DetailIdentifier,
      code,
      qrJson: qrJson ?? qrOptionsDefault
    });
  };

  const handleSelectedOrderDetail = (orderDetail: OrderDetail, order: Order) => {
    setSelectedOrder(orderDetail);
    if (!qrContext) return;
    qrContext.setOrderDetail({
      code: orderDetail.orderDetailCode,
      detailID: orderDetail.orderDetailID,
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
    const { detailID, qrJson } = qrContext.orderDetail;
    toast.promise(
      detailIdentifier === "claimCode"
        ? editLoyaltyCardDetail({
            data: { qrJson },
            loyaltyCardDetailID: detailID
          })
        : editOrderDetailMutation({
            data: { qrJson },
            orderDetailID: detailID
          }),
      {
        loading: "Guardando...",
        success: () => {
          qrContext.clearOrderDetail();
          setSelectedOrder(null);
          setDetailIdentifier("orderDetailCode");
          return "Guardado con éxito";
        }
      }
    );
  };

  const handleCancel = () => {
    if (!qrContext) return;
    qrContext.clearOrderDetail();
    setSelectedOrder(null);
    setDetailIdentifier("orderDetailCode");
  };

  return Boolean(qrContext?.orderDetail.detailID) ? (
    <div className="flex flex-col gap-4">
      <Select
        value={detailIdentifier}
        label="Seleccionar Detalle"
        data={detailTypes}
        onChange={handleChangeSelectedDetailType}
      />
      <div className="flex gap-4">
        <Button
          loading={isPending || isPendingLoyaltyCardDetail}
          onClick={handleSave}
          className="w-[50%]"
          bg="green"
        >
          Guardar
        </Button>
        <Button
          variant="outline"
          disabled={isPending || isPendingLoyaltyCardDetail}
          onClick={handleCancel}
          className="w-[50%]"
          color="red"
        >
          Cancelar
        </Button>
      </div>
    </div>
  ) : (
    <Button onClick={handleOnClick} className="w-[50%]">
      Asignar a Detalle
    </Button>
  );
}
