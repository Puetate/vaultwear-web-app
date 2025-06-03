import { dayjs } from "@/@lib/dayjs/dayjs";
import { cn } from "@/@lib/utils";
import { Statistics } from "@/@models/reports.model";
import { Card, Skeleton } from "@mantine/core";
import {
  IconCalendarDollar,
  IconMoneybag,
  IconTruckDelivery,
  IconTruckLoading,
  IconUsers,
  IconUsersGroup
} from "@tabler/icons-react";
import { ReactNode } from "@tanstack/react-router";
import { useGetStatistics } from "../@services/getStatistics.service";

const currentMonthName = dayjs().format("MMMM");

const labels: Record<keyof Statistics, string> = {
  ordersCompletedThisMonthCount: `Ordenes Completadas`,
  ordersPendingThisMonthCount: "Ordenes Pendientes",
  clientsCount: "Clientes",
  usersCount: "Usuarios",
  salesThisMonth: "Ventas este mes",
  totalSales: "Ventas totales"
};

const icons: Record<keyof Statistics, ReactNode> = {
  ordersPendingThisMonthCount: <IconTruckLoading size={40} />,
  ordersCompletedThisMonthCount: <IconTruckDelivery size={40} />,
  clientsCount: <IconUsersGroup size={40} />,
  usersCount: <IconUsers size={40} />,
  salesThisMonth: <IconCalendarDollar size={40} />,
  totalSales: <IconMoneybag size={40} />
};

export default function StatisticsCards() {
  const { data: statistics } = useGetStatistics();

  return statistics ? (
    <div className="flex w-full flex-1 flex-col items-center">
      <h2 className="mb-4 text-2xl font-bold">Estadísticas de {currentMonthName}</h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {Object.entries(statistics).map(([key, value], index) => (
          <Card
            key={key}
            className={cn(
              "flex items-center justify-between rounded-lg bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md dark:bg-gray-900",
              index === Object.entries(statistics).length - 1 &&
                Object.entries(statistics).length % 2 === 1 &&
                "md:col-span-2"
            )}
          >
            <div className="flex h-full w-full items-center justify-around gap-4">
              <span className="text-3xl">
                {typeof value === "number" ? value.toLocaleString() : `$${value ?? 0}`}
              </span>
              <div className="flex flex-col gap-2">
                <span className="self-center">{icons[key as keyof Statistics]}</span>
                <span className="font-bold">{labels[key as keyof Statistics]}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-1 flex-col items-center">
      <h2 className="mb-4 text-2xl font-bold">Estadísticas de {currentMonthName}</h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} h="7rem" radius="xl" />
        ))}
      </div>
    </div>
  );
}
