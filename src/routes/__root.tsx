import Providers from "@/@providers/Providers";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: () => (
    <>
      <Providers>
        <Outlet />
      </Providers>
      <TanStackRouterDevtools />
    </>
  )
});
