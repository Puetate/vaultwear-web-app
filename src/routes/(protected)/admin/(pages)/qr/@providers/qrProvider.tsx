import { createContext, use, useState } from "react";

interface OrderDetail {
  orderDetailID: number;
  orderDetailCode: string;
  qrJson: string | null;
  text: string;
}

interface QRContextState {
  orderDetail: OrderDetail;
  setOrderDetail: (orderDetail: Partial<OrderDetail>) => void;
  clearOrderDetail: () => void;
}

const initialValues: OrderDetail = {
  orderDetailID: 0,
  orderDetailCode: "",
  qrJson: null,
  text: ""
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
