import { createFileRoute } from "@tanstack/react-router";
import HomeAnimation from "./@components/HomeAnimation";
import StatisticsCards from "./@components/StatisticsCards";

export const Route = createFileRoute("/(protected)/admin/")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <div className="flex h-full w-full flex-col justify-center gap-20 md:flex-row">
        <HomeAnimation />
        <StatisticsCards />
      </div>
    </div>
  );
}
