import { useSessionStore } from "@/@stores/session.store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AppLayout from "./@components/AppLayout";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async () => {
    const session = await useSessionStore.getState().refreshSession();
    if (!session) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: RouteComponent
});
function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
