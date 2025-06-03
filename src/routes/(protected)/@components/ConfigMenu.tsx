"use client";
import ColorSchemaSwitch from "@/@components/ColorSchemaSwitch";
import { useSessionStore } from "@/@stores/session.store";
import { Menu } from "@mantine/core";
import { IconLogout, IconSettingsFilled } from "@tabler/icons-react";

export default function ConfigMenu() {
  const logOut = useSessionStore((state) => state.logOut);
  return (
    <div>
      <Menu withArrow>
        <Menu.Target>
          <IconSettingsFilled className="hover:cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item closeMenuOnClick={false}>
            <ColorSchemaSwitch />
          </Menu.Item>
          <Menu.Item onClick={logOut} leftSection={<IconLogout />}>
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
