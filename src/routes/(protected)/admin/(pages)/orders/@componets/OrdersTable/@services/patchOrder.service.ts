import API from "@/@lib/axios/api";
import { Order } from "@/@models/order.model";
import { modals } from "@mantine/modals";
import { useMutation as patchMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_QUERY_KEY } from "../../OrdersTable/@services/getOrders.service";

export function patchOrderService(orderSchema: Partial<Order>) {
  const { orderID, ...data } = orderSchema;
  const url = `/order/${orderID}`;
  return API.patch({ url, data });
}

export const usePatchOrder = () => {
  const queryClient = useQueryClient();

  return patchMutation({
    mutationFn: patchOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
