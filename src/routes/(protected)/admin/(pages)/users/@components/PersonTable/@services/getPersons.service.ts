import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import API from "@/@lib/axios/api";
import { generatePaginationUrl } from "@/@lib/utils/generatePaginationUrl.util";
import { Person } from "@/@models/user.model";
import { PaginatedResponse, ServicePaginationParams } from "@/@types/pagination.type";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const PERSON_QUERY_KEY = "person";

export function getPersonsService(url: string) {
  return API.get<PaginatedResponse<Person>>({ url });
}

export const getPaginatedPersonsQueryOptions = (url?: string) => {
  if (!url) {
    url = generatePaginationUrl("/person", {
      pagination: { pageIndex: PAGE_INDEX, pageSize: PAGE_SIZE },
      filter: "",
      columnFilters: []
    });
  }
  return queryOptions<PaginatedResponse<Person>>({
    queryKey: [PERSON_QUERY_KEY, url],
    queryFn: () => getPersonsService(url)
  });
};
export const useGetPaginatedPersons = (params: ServicePaginationParams) => {
  const url = generatePaginationUrl("/person", params);
  return useQuery<PaginatedResponse<Person>>(getPaginatedPersonsQueryOptions(url));
};
