import API from "@/@lib/axios/api";
import { Session } from "@/@types/session.type";

export function getMeService() {
  const url = "/auth/me";
  return API.get<Session>({ url });
}
