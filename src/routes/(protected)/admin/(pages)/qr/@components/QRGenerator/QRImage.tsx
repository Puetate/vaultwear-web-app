import { Button, CopyButton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCheck, IconCopy, IconDownload } from "@tabler/icons-react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useMemo, useRef } from "react";
import { useQRContext } from "../../@providers/qrProvider";

interface QRImageProps {
  options?: Partial<Options>;
}

export default function QRImage({ options }: QRImageProps) {
  const qrContext = useQRContext();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useMemo(() => new QRCodeStyling(options), []);

  const handleDownload = async () => {
    const qrBlob: Blob = await qrCode.getRawData("svg");
    const qrSVGTextRaw = await qrBlob.text();
    const qrSVGText = qrSVGTextRaw.replace(/<\?xml.*?\?>\s*/g, "");
    const sizeMatch = qrSVGText.match(/<svg[^>]*width="(\d+)"[^>]*height="(\d+)"/);

    let qrWidth = 250;
    let qrHeight = 250;

    if (sizeMatch) {
      qrWidth = parseInt(sizeMatch[1], 10);
      qrHeight = parseInt(sizeMatch[2], 10);
    }

    const text = qrContext?.orderDetail.text || "QR Code";

    // Crear un canvas temporal para medir el texto
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const fontSize = 14;
    ctx!.font = `${fontSize}px sans-serif`;

    const maxTextWidth = qrWidth;
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = ctx!.measureText(testLine).width;
      if (testWidth > maxTextWidth && currentLine !== "") {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = fontSize + 4;
    const textBlockHeight = lines.length * lineHeight;
    const totalHeight = qrHeight + textBlockHeight + 10;

    const textElements = lines
      .map((line, i) => {
        const y = qrHeight + 20 + i * lineHeight;
        return `<text x="${qrWidth / 2}" y="${y}" text-anchor="middle" font-size="${fontSize}" fill="#000">${line}</text>`;
      })
      .join("");

    const combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${qrWidth}" height="${totalHeight}">
      <g transform="translate(0, 0)">
        ${qrSVGText}
      </g>
      ${textElements}
    </svg>
  `;

    const blob = new Blob([combinedSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${text}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useShallowEffect(() => {
    if (!qrRef.current) return;
    if (!options?.data) {
      qrRef.current.innerHTML = "";
      return;
    }
    qrCode.update(options);
    qrRef.current.innerHTML = "";
    qrCode.append(qrRef.current);
  }, [qrRef, options]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-fit w-fit" ref={qrRef}></div>
      <div className="flex gap-3">
        <CopyButton value={JSON.stringify(options)} timeout={2000}>
          {({ copied, copy }) => (
            <Button
              disabled={!options?.data}
              color={copied ? "teal" : "gray"}
              leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              variant="subtle"
              onClick={copy}
            >
              {copied ? "Copiado " : "Copiar JSON al portapapeles"}
            </Button>
          )}
        </CopyButton>
        <Button
          onClick={() => handleDownload()}
          disabled={!options?.data}
          leftSection={<IconDownload />}
        >
          Descargar QR
        </Button>
      </div>
    </div>
  );
}
