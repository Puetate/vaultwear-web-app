import { Options } from "qr-code-styling";
import { useState } from "react";
import { QRProvider } from "../../@providers/qrProvider";
import OrderSelector from "./OrderSelector/OrderSelector";
import QRImage from "./QRImage";
import QROptions from "./QROptions/QROptions";

export default function QRGenerator() {
  const [options, setOptions] = useState<Partial<Options>>({});

  return (
    <QRProvider>
      <div className="grid h-full w-full grid-cols-2 gap-4">
        <QROptions onChange={setOptions} />
        <div className="flex flex-col items-center gap-4">
          <QRImage options={options} />
          <OrderSelector />
        </div>
      </div>
    </QRProvider>
  );
}
