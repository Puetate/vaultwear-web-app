import API from "@/@lib/axios/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function singOutService() {
  const url = "/auth/sign-out";
  return API.public.post({ url });
}

export const useSingOut = () => {
  return useMutation({
    mutationFn: singOutService,
    onSuccess: () => {
      toast.success("Sesión cerrada correctamente!");
    }
  });
};
