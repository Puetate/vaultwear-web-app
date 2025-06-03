import API from "@/@lib/axios/api";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../../UsersTable/@services/getUsers.service";
import { UserSchema } from "../userSchema";

export function patchUserService(schema: Partial<UserSchema>) {
  const { role, ...data } = schema;
  const url = `/user/${schema.userID}`;
  return API.patch({ url, data: { ...data, roleID: role?.roleID } });
}

export const usePatchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY], refetchType: "all" });
      modals.closeAll();
    }
  });
};
