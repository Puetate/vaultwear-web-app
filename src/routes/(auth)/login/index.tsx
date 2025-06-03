import { createFileRoute } from "@tanstack/react-router";
import FormLogin from "./@components/FormLogin/FormLogin";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent
});
function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <img src="/logo.svg" className="z-10 w-96" alt="RUMI LOGO" />
      <FormLogin />
    </div>
  );
}
