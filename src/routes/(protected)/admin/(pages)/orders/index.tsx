import { RouterContext } from "@/main";
import { createFileRoute } from "@tanstack/react-router";
import { getPaginatedOrdersQueryOptions } from "./@componets/OrdersTable/@services/getOrders.service";
import OrdersTable from "./@componets/OrdersTable/OrdersTable";

export const Route = createFileRoute("/(protected)/admin/(pages)/orders/")({
  beforeLoad: ({ context }) =>
    (context as RouterContext).queryClient.ensureQueryData(getPaginatedOrdersQueryOptions()),
  component: RouteComponent
});

function RouteComponent() {
  return <OrdersTable />;
}
