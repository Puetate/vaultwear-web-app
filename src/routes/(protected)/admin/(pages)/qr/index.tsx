import { createFileRoute } from "@tanstack/react-router";
import QRGenerator from "./@components/QRGenerator/QRGenerator";

export const Route = createFileRoute("/(protected)/admin/(pages)/qr/")({
  component: RouteComponent
});

function RouteComponent() {
  return <QRGenerator />;
}
