import { createContext, use, useState } from "react";

export type DetailIdentifier = "orderDetailCode" | "claimCode";

export const detailTypes: {
  label: string;
  value: DetailIdentifier;
}[] = [
  {
    label: "Detalle de Orden",
    value: "orderDetailCode"
  },
  {
    label: "Programa de fidelidad",
    value: "claimCode"
  }
];

interface OrderDetail {
  detailID: number;
  code: string;
  qrJson: string | null | object;
  text: string;
  detailIdentifier: DetailIdentifier;
}

interface QRContextState {
  orderDetail: OrderDetail;
  setOrderDetail: (orderDetail: Partial<OrderDetail>) => void;
  clearOrderDetail: () => void;
}

const initialValues: OrderDetail = {
  detailID: 0,
  code: "",
  qrJson: null,
  text: "",
  detailIdentifier: "orderDetailCode"
};

const QRContext = createContext<QRContextState | null>(null);

export const QRProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderDetail, setOrderDetailState] = useState<OrderDetail>(initialValues);

  const setOrderDetail = (orderDetail: Partial<OrderDetail>) => {
    setOrderDetailState((prev) => ({
      ...prev,
      ...orderDetail
    }));
  };

  const clearOrderDetail = () => {
    setOrderDetailState(initialValues);
  };

  return <QRContext value={{ orderDetail, setOrderDetail, clearOrderDetail }}>{children}</QRContext>;
};

export const useQRContext = () => use(QRContext);
