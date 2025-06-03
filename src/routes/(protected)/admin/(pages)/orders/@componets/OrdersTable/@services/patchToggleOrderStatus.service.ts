import API from "@/@lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_QUERY_KEY } from "./getOrders.service";

export function patchToggleOrderStatusService(orderID: number) {
  const url = `/order/toggle-status/${orderID}`;
  return API.patch({ url });
}

export const usePatchToggleOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchToggleOrderStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY], refetchType: "all" });
    }
  });
};
