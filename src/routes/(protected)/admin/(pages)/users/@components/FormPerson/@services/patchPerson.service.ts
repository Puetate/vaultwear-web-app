import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PERSON_QUERY_KEY } from "../../PersonTable/@services/getPersons.service";
import { PersonSchema } from "../personSchema";

export function patchPersonService(schema: Partial<PersonSchema>) {
  const url = `/person/${schema.personID}`;
  return API.patch({ url, data: schema });
}

export const usePatchPerson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPersonService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERSON_QUERY_KEY], refetchType: "all" });
      toast.success("Persona creada correctamente");
      modals.closeAll();
    }
  });
};
