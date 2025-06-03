import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PERSON_QUERY_KEY } from "../../PersonTable/@services/getPersons.service";
import { PersonSchema } from "../personSchema";

export function postPersonService(schema: PersonSchema) {
  const url = "/person";
  return API.post({ url, data: schema });
}

export const usePostPerson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPersonService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERSON_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
