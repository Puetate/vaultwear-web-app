import { Person, User } from "./user.model";

export interface Order {
  orderID: number;
  orderDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  total: string;
  user: OrderUser;
  person: OrderPerson;
  completed: "COMPLETADA" | "PENDIENTE" | boolean;
  includeDelivery: string;
  orderDetails: OrderDetail[];
  status: string;
}

export interface OrderUser extends Pick<User, "userID" | "email"> {}

export interface OrderPerson extends Person {
  fullName: string;
}

export interface LoyaltyCardDetail {
  loyaltyCardDetailID: number;
  claimCode: string;
  qrJson: null | string | object;
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
  loyaltyCardDetail: LoyaltyCardDetail;
}

export interface HistoricOrderDetail extends OrderDetail {
  historicOrderDetailID: number;
  historicType: "CREADO" | "ACTUALIZADO" | "ELIMINADO";
}
