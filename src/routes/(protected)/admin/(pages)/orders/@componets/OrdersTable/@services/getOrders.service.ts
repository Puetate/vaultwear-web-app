import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import API from "@/@lib/axios/api";
import { generatePaginationUrl } from "@/@lib/utils/generatePaginationUrl.util";
import { Order } from "@/@models/order.model";
import { PaginatedResponse, ServicePaginationParams } from "@/@types/pagination.type";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const ORDER_QUERY_KEY = "order";

export function getOrdersService(url: string) {
  return API.get<PaginatedResponse<Order>>({ url });
}

export const getPaginatedOrdersQueryOptions = (url?: string) => {
  if (!url) {
    url = generatePaginationUrl("/order", {
      pagination: { pageIndex: PAGE_INDEX, pageSize: PAGE_SIZE },
      filter: "",
      columnFilters: []
    });
  }
  return queryOptions<PaginatedResponse<Order>>({
    queryKey: [ORDER_QUERY_KEY, url],
    queryFn: () => getOrdersService(url)
  });
};

export const useGetPaginatedOrders = (params: ServicePaginationParams) => {
  const url = generatePaginationUrl("/order", params);
  return useQuery<PaginatedResponse<Order>>(getPaginatedOrdersQueryOptions(url));
};
