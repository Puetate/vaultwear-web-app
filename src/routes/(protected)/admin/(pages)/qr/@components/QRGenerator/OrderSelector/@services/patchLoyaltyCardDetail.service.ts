import API from "@/@lib/axios/api";
import { LoyaltyCardDetail } from "@/@models/order.model";
import { ORDER_QUERY_KEY } from "@/routes/(protected)/admin/(pages)/orders/@componets/OrdersTable/@services/getOrders.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ServiceParams {
  loyaltyCardDetailID: number;
  data: Partial<LoyaltyCardDetail>;
}

export function patchLoyaltyCardDetailService({ loyaltyCardDetailID, data }: ServiceParams) {
  const url = `/loyalty-card-detail/${loyaltyCardDetailID}`;
  return API.patch({ url, data });
}

export const usePatchLoyaltyCardDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLoyaltyCardDetailService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY], refetchType: "all" });
      toast.success("Detalle del programa de fidelidad actualizado correctamente");
    }
  });
};
