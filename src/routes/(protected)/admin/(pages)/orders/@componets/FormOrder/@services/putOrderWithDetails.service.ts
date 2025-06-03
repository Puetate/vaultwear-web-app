import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_QUERY_KEY } from "../../OrdersTable/@services/getOrders.service";
import { OrderSchema } from "../orderSchema";

export function putOrderWithDetailsService(orderSchema: OrderSchema) {
  const url = "/order/with-details";
  return API.put({ url, data: orderSchema });
}

export const usePutWithDetailsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putOrderWithDetailsService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
