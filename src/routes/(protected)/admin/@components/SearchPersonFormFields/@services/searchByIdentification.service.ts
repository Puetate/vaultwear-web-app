import API from "@/@lib/axios/api";
import { Person } from "@/@models/user.model";
import { useQuery } from "@tanstack/react-query";

export const PERSON_IDENTIFICATION_QUERY_KEY = "person-identification";

export function searchByIdentificationService(search: string) {
  const url = `/person/search-identification?identification=${search}`;
  return API.get<Person[] | null>({ url });
}

export const useSearchByIdentification = (search: string) => {
  return useQuery<Person[] | null>({
    queryKey: [PERSON_IDENTIFICATION_QUERY_KEY, search],
    queryFn: () => searchByIdentificationService(search),
    enabled: Boolean(search)
  });
};
