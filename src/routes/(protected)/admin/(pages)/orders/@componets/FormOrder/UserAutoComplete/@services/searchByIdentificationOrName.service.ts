import API from "@/@lib/axios/api";
import { User } from "@/@models/user.model";
import { useQuery } from "@tanstack/react-query";

export const PERSON_IDENTIFICATION_QUERY_KEY = "person-identification";

export function searchByIdentificationOrNameService(search: string) {
  const url = `/user/search-identification?search=${search}`;
  return API.get<User[] | null>({ url });
}

export const useSearchByIdentificationOrName = (search: string) => {
  return useQuery<User[] | null>({
    queryKey: [PERSON_IDENTIFICATION_QUERY_KEY, search],
    queryFn: () => searchByIdentificationOrNameService(search),
    enabled: Boolean(search)
  });
};
