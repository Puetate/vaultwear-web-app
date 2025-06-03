import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import API from "@/@lib/axios/api";
import { generatePaginationUrl } from "@/@lib/utils/generatePaginationUrl.util";
import { User } from "@/@models/user.model";
import { PaginatedResponse, ServicePaginationParams } from "@/@types/pagination.type";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const USER_QUERY_KEY = "user";

export function getUsersService(url: string) {
  return API.get<PaginatedResponse<User>>({ url });
}

export const getPaginatedUsersQueryOptions = (url?: string) => {
  if (!url) {
    url = generatePaginationUrl("/user", {
      pagination: { pageIndex: PAGE_INDEX, pageSize: PAGE_SIZE },
      filter: "",
      columnFilters: []
    });
  }
  return queryOptions<PaginatedResponse<User>>({
    queryKey: [USER_QUERY_KEY, url],
    queryFn: () => getUsersService(url)
  });
};

export const useGetPaginatedUsers = (params: ServicePaginationParams) => {
  const url = generatePaginationUrl("/user", params);
  return useQuery<PaginatedResponse<User>>(getPaginatedUsersQueryOptions(url));
};
