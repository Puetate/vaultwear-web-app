import API from "@/@lib/axios/api";
import { PERSON_IDENTIFICATION_QUERY_KEY } from "@/routes/(protected)/admin/@components/SearchPersonFormFields/@services/searchByIdentification.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PERSON_QUERY_KEY } from "./getPersons.service";

export function patchTogglePersonStatusService(personID: number) {
  const url = `/person/toggle-status/${personID}`;
  return API.patch({ url });
}

export const usePatchTogglePersonStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTogglePersonStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERSON_QUERY_KEY], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: [PERSON_IDENTIFICATION_QUERY_KEY], refetchType: "all" });
    }
  });
};
