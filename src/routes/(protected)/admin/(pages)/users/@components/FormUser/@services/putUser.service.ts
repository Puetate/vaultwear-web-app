import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../../UsersTable/@services/getUsers.service";
import { UserSchema } from "../userSchema";

export function putUserService(schema: Partial<UserSchema>) {
  const url = "/user/with-person";
  return API.put({ url, data: schema });
}

export const usePutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
