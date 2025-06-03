import { Person } from "@/@models/user.model";
import { Badge } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function usePersonTableColumns() {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nombre"
      },
      {
        accessorKey: "surname",
        header: "Apellido"
      },
      {
        accessorKey: "identification",
        header: "Identificación"
      },
      {
        accessorKey: "phone",
        header: "Teléfono"
      },
      {
        accessorKey: "address",
        header: "Dirección"
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
