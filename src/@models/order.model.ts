export interface Order {
  orderID: number;
  orderDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  total: string;
  person: OrderPerson;
  completed: "COMPLETADA" | "PENDIENTE" | boolean;
  includeDelivery: string;
  orderDetails: OrderDetail[];
  status: string;
}

export interface OrderPerson {
  personID: number;
  fullName: string;
  name: string;
  surname: string;
  phone: string;
  identification: string;
  address: string;
}

export interface OrderDetail {
  orderDetailID: number;
  orderDetailCode: string;
  description: string;
  contents: {
    contentTypeID: number;
    contentTypeName: string;
    urlContent: string;
    description?: string;
  }[];
  qrJson: null | string | object;
  quantity: number;
  price: number;
}

export interface HistoricOrderDetail extends OrderDetail {
  historicOrderDetailID: number;
  historicType: "CREADO" | "ACTUALIZADO" | "ELIMINADO";
}
