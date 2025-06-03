import API from "@/@lib/axios/api";
import { OrderDetail } from "@/@models/order.model";
import { ORDER_QUERY_KEY } from "@/routes/(protected)/admin/(pages)/orders/@componets/OrdersTable/@services/getOrders.service";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ServiceParams {
  data: Partial<OrderDetail>;
  orderDetailID: number;
}

export function patchOrderDetailService(params: ServiceParams) {
  const { data, orderDetailID } = params;
  const url = `/order-detail/${orderDetailID}`;
  return API.patch({ url, data });
}

export const usePatchOrderDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchOrderDetailService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
