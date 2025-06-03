import { User } from "@/@models/user.model";
import { Badge } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function userUsersTableColumns() {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Nombre"
      },
      {
        accessorKey: "role.roleName",
        header: "Rol"
      },
      {
        accessorKey: "email",
        header: "Correo"
      },
      {
        accessorKey: "status",
        header: "Estado",
        Cell: ({ row, renderedCellValue }) => {
          return (
            <Badge color={row.original.status === "ACTIVO" ? "green" : "red"}>{renderedCellValue}</Badge>
          );
        },
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { label: "ACTIVO", value: "ACTIVO" },
            { label: "INACTIVO", value: "INACTIVO" }
          ]
        }
      }
    ],
    []
  );

  return columns;
}
