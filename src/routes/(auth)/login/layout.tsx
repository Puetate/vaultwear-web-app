import { useSessionStore } from "@/@stores/session.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  beforeLoad: async () => {
    //TODO: Find a better way to handle this if the user click the logout button
    const isLogOut = useSessionStore.getState().isLogOut;
    if (isLogOut) {
      return;
    }
    const session = await useSessionStore.getState().refreshSession();
    if (session && session.user) {
      throw redirect({
        to: "/admin"
      });
    }
  }
});
