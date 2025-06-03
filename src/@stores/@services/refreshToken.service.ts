import API from "@/@lib/axios/api";

export function refreshTokenService() {
  const url = "/auth/refresh-token";
  return API.public.get<{ accessToken: string }>({ url });
}
