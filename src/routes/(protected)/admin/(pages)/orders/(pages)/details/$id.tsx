import { RouterContext } from "@/main";
import { Badge } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import QRImage from "../../../qr/@components/QRGenerator/QRImage";
import {
  getHistoricOrderDetailQueryOptions,
  useGetHistoricOrderDetail
} from "./@services/getHistoricOrderDetail.service";

export const Route = createFileRoute("/(protected)/admin/(pages)/orders/(pages)/details/$id")({
  loader: async ({ params, context }) =>
    (context as RouterContext).queryClient.ensureQueryData(
      getHistoricOrderDetailQueryOptions(Number(params.id))
    ),
  component: RouteComponent
});

const historicTypeColor = {
  CREADO: "green",
  ACTUALIZADO: "blue",
  ELIMINADO: "red"
};

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: historicOrdenDetails } = useGetHistoricOrderDetail(Number(id));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-bold">
        Historial del Detalle{" "}
        {historicOrdenDetails && historicOrdenDetails.length > 0
          ? historicOrdenDetails[0].orderDetailCode
          : ""}
      </h1>
      {historicOrdenDetails?.map((detail) => (
        <div key={detail.orderDetailID} className="flex flex-col gap-2 rounded-lg border p-4 shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col gap-3">
              <p>
                <span className="font-bold"> Descripción:</span> {detail.description}
              </p>
              <p>
                <span className="font-bold">Tipo de contenido:</span>Tipo de contenido:{" "}
                {detail.contentTypeName}
              </p>
              <p>
                <span className="font-bold">Código: </span> {detail.orderDetailCode}
              </p>
              <p>
                <span className="font-bold"> Precio:</span> ${detail.price}
              </p>
              <Badge color={historicTypeColor[detail.historicType]} size="sm">
                {detail.historicType}
              </Badge>
            </div>
            <QRImage options={detail.qrJson as object} />
          </div>
        </div>
      ))}
    </div>
  );
}
