import API from "@/@lib/axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./getUsers.service";

export function patchToggleUserStatusService(userID: number) {
  const url = `/user/toggle-status/${userID}`;
  return API.patch({ url });
}

export const usePatchToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchToggleUserStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY], refetchType: "all" });
    }
  });
};
