import { RouterContext } from "@/main";
import { createFileRoute } from "@tanstack/react-router";
import { getPaginatedUsersQueryOptions } from "./@components/UsersTable/@services/getUsers.service";
import UsersTable from "./@components/UsersTable/UsersTable";

export const Route = createFileRoute("/(protected)/admin/(pages)/users/")({
  loader: ({ context }) =>
    Promise.all([
      (context as RouterContext).queryClient.ensureQueryData(getPaginatedUsersQueryOptions())
    ]),
  component: RouteComponent
});

function RouteComponent() {
  return <UsersTable />;
}
