import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../../UsersTable/@services/getUsers.service";
import { UserSchema } from "../userSchema";

export function postUserService(schema: UserSchema) {
  const url = "/user/with-person";
  return API.post({ url, data: schema });
}

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
