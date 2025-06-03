import { Order } from "@/@models/order.model";
import { Badge, Button, Card, Popover, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function useOrdersTableColumns() {
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "completed",
        header: "Estado de la orden",
        Cell: ({ row, renderedCellValue }) => {
          return (
            <Badge color={row.original.completed === "COMPLETADA" ? "green" : "lime"}>
              {renderedCellValue}
            </Badge>
          );
        },
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { label: "COMPLETADA", value: "COMPLETADA" },
            { label: "PENDIENTE", value: "PENDIENTE" }
          ]
        }
      },
      {
        accessorKey: "person.fullName",
        header: "Cliente"
      },
      {
        accessorKey: "person.phone",
        header: "Teléfono del cliente"
      },
      {
        accessorKey: "orderDate",
        header: "Fecha de Orden"
      },
      {
        accessorKey: "deliveryDate",
        header: "Fecha de Entrega"
      },
      {
        accessorKey: "deliveryAddress",
        header: "Dirección de Entrega"
      },
      {
        accessorKey: "total",
        header: "Total",
        Cell: ({ renderedCellValue }) => {
          return <span>{`$${renderedCellValue}`}</span>;
        }
      },
      {
        accessorKey: "includeDelivery",
        header: "Incluye Entrega",
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { label: "SI", value: "SI" },
            { label: "NO", value: "NO" }
          ]
        }
      },
      {
        accessorKey: "orderDetails",
        header: "Detalles de Orden",
        Cell: ({ row }) => {
          return (
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button variant="subtle" leftSection={<IconEye />}>
                  Ver detalle
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="flex flex-col gap-2">
                  {row.original.orderDetails.map((detail) => (
                    <Card
                      withBorder
                      shadow="lg"
                      key={detail.orderDetailID}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-3">
                          <Text size="xs">
                            <span className="font-bold">Descripción:</span> {detail.description}
                          </Text>
                          <Text size="xs">
                            <span className="font-bold">Tipo de contenido:</span>{" "}
                            {detail.contentTypeName}
                          </Text>
                          <Text size="xs">
                            <span className="font-bold">Código:</span> {detail.orderDetailCode}
                          </Text>
                          <Text size="xs">
                            <span className="font-bold">Precio:</span> ${detail.price}
                          </Text>
                        </div>
                        <Button
                          variant="outline"
                          to={`/admin/orders/details/${detail.orderDetailID}`}
                          component={Link}
                        >
                          <IconEye />
                          Ver historial
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Popover.Dropdown>
            </Popover>
          );
        }
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
