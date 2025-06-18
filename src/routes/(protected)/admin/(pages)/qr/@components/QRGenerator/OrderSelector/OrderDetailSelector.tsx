import { OrderDetail } from "@/@models/order.model";
import { Radio } from "@mantine/core";

interface OrderDetailSelectorProps {
  client: string;
  orderDetails: OrderDetail[];
  onSelectOrderDetail?: (orderDetail: OrderDetail) => void;
}
export default function OrderDetailSelector({
  client,
  orderDetails,
  onSelectOrderDetail
}: OrderDetailSelectorProps) {
  const handleSelectedOrderDetail = (orderDetailID: string) => {
    const orderDetail = orderDetails.find(
      (orderDetail) => orderDetail.orderDetailID.toString() === orderDetailID
    );
    onSelectOrderDetail?.(orderDetail!);
  };
  return (
    <Radio.Group onChange={handleSelectedOrderDetail} label="Detalles">
      <div className="flex flex-col gap-2">
        {orderDetails.map((orderDetail) => {
          const label = `${orderDetail.orderDetailCode} - ${client} - ${orderDetail.description}`;
          return (
            <Radio
              key={orderDetail.orderDetailID}
              value={orderDetail.orderDetailID.toString()}
              label={label}
            />
          );
        })}
      </div>
    </Radio.Group>
  );
}
