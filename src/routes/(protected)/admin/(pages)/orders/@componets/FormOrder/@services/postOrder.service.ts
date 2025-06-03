import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderSchema } from "../orderSchema";

export function postOrderService(schema: OrderSchema) {
  const url = "/order/with-details";
  return API.post({ url, data: schema });
}

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      modals.closeAll();
    }
  });
};
