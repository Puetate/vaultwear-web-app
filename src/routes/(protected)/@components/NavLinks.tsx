import { cn } from "@/@lib/utils";
import { NavLink } from "@mantine/core";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export type Link = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

interface NavLinksProps {
  onPathChange: (label: string) => void;
}
const paths = [
  {
    label: "Inicio",
    href: "/admin/",
    roles: ["ADMIN"]
  },
  {
    label: "Usuarios",
    href: "/admin/users",
    roles: ["ADMIN"]
  },
  {
    label: "Ordenes",
    href: "/admin/orders",
    roles: ["ADMIN"]
  },
  {
    label: "QR",
    href: "/admin/qr",
    roles: ["ADMIN"]
  }
];
export default function NavLinks({ onPathChange }: NavLinksProps) {
  const router = useRouter();

  const handleLinkChange = (label: string) => {
    onPathChange(label);
  };

  useEffect(() => {
    const pathname = router.state.location.pathname;
    const currentPath = paths.find((path) => path.href === pathname);
    if (currentPath) {
      onPathChange(currentPath.label);
    }
  }, []);

  return (
    <>
      {paths.map((path) => {
        return (
          <NavLink
            variant="light"
            activeOptions={{ exact: true }}
            component={Link}
            key={path.label}
            label={path.label}
            to={path.href}
            onClick={() => handleLinkChange(path.label)}
            className={cn("mt-2 rounded-lg uppercase")}
          />
        );
      })}
    </>
  );
}
