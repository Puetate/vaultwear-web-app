import { useSessionStore } from "@/@stores/session.store";
import { AppShell, Burger, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import ConfigMenu from "./ConfigMenu";
import NavLinks from "./NavLinks";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const session = useSessionStore((state) => state.session);
  const { colorScheme } = useMantineColorScheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [title, setTitle] = useState("");
  const handleLinkChange = (title: string) => {
    setTitle(title);
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding="md"
    >
      <AppShell.Header className="">
        <Group h="100%" px="md" className="flex justify-between">
          <div className="flex items-center gap-3">
            <Group h="100%" px="md">
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="md" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="md" />
            </Group>
            <Text className="hidden text-xl font-bold uppercase md:block">{title}</Text>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Text>{session && session.user ? session.user.person.fullName : "N/A"}</Text>
            <ConfigMenu />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="">
        <Group>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="md" />
          <img
            src={colorScheme == "dark" ? "/logo.svg" : "/logo-dark.svg"}
            className="w-36 sm:mx-auto sm:w-56"
            alt=""
          />
        </Group>
        <NavLinks onPathChange={handleLinkChange} />
      </AppShell.Navbar>
      <AppShell.Main className="flex">
        <div className="flex w-full flex-col">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
