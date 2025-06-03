import { RouterContext } from "@/main";
import { Tabs } from "@mantine/core";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { getPaginatedPersonsQueryOptions } from "./@components/PersonTable/@services/getPersons.service";
import PersonTable from "./@components/PersonTable/PersonTable";
import { getPaginatedUsersQueryOptions } from "./@components/UsersTable/@services/getUsers.service";
import UsersTable from "./@components/UsersTable/UsersTable";

export const Route = createFileRoute("/(protected)/admin/(pages)/users/")({
  loader: ({ context }) =>
    Promise.all([
      (context as RouterContext).queryClient.ensureQueryData(getPaginatedUsersQueryOptions()),
      (context as RouterContext).queryClient.ensureQueryData(getPaginatedPersonsQueryOptions())
    ]),
  component: RouteComponent
});

function RouteComponent() {
  return (
    <Tabs defaultValue="users">
      <Tabs.List>
        <Tabs.Tab value="users" leftSection={<IconUsers size={12} />}>
          Usuarios
        </Tabs.Tab>
        <Tabs.Tab value="persons" leftSection={<IconUser size={12} />}>
          Personas
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="users">
        <UsersTable />
      </Tabs.Panel>
      <Tabs.Panel value="persons">
        <PersonTable />
      </Tabs.Panel>
    </Tabs>
  );
}
