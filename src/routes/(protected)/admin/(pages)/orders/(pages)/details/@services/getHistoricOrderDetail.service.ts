import API from "@/@lib/axios/api";
import { HistoricOrderDetail } from "@/@models/order.model";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const HISTORIC_ORDER_DETAIL_QUERY_KEY = "historic-order-detail";

export function getHistoricOrderDetailService(orderDetailID: number) {
  const url = `/order-detail/historic/${orderDetailID}`;
  return API.get<HistoricOrderDetail[]>({ url });
}

export const getHistoricOrderDetailQueryOptions = (orderDetailID: number) => {
  return queryOptions<HistoricOrderDetail[]>({
    queryKey: [HISTORIC_ORDER_DETAIL_QUERY_KEY, orderDetailID],
    queryFn: () => getHistoricOrderDetailService(orderDetailID)
  });
};

export const useGetHistoricOrderDetail = (orderDetailID: number) => {
  return useQuery<HistoricOrderDetail[]>(getHistoricOrderDetailQueryOptions(orderDetailID));
};
