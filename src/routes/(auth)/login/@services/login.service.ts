import API from "@/@lib/axios/api";
import { Session } from "@/@types/session.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginSchema } from "../@components/FormLogin/loginSchema";

export function loginService(loginSchema: LoginSchema) {
  const url = "/auth/login";
  return API.public.post<Session>({ url, data: loginSchema });
}

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      toast.success("Bienvenido!");
    },
  });
};
