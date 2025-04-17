"use client";

import { useState, useRef } from "react";
import {QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Share2, Printer, Download, QrCodeIcon } from "lucide-react";

export function QrSharePopover({ url, cor }: { url: string, cor: string }) {
  const [open, setOpen] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && qrRef.current) {
      const qrHTML = qrRef.current.innerHTML;
  
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir QR Code</title>
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background: white;
                }
  
                .print-container {
                  width: 300px;
                  height: 300px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #ccc;
                  padding: 20px;
                }
  
                canvas {
                  width: 100% !important;
                  height: auto !important;
                }
              }
  
              /* Estilo base pra visualização no print preview */
              body {
                margin: 0;
                padding: 0;
                background: white;
                font-family: sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
  
              .print-container {
                width: 300px;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ccc;
                padding: 20px;
              }
  
              canvas {
                width: 100% !important;
                height: auto !important;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${qrHTML}
            </div>
          </body>
        </html>
      `);
  
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };
  

  const handleDownload = () => {
    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;
  
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
  
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      ctx.drawImage(image, 0, 0);
  
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      a.click();
  
      URL.revokeObjectURL(url);
    };
  
    image.src = url;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Minha página 💖",
          text: "Olha essa página linda que criamos juntos!",
          url,
        })
        .catch(console.error);
    } else {
      alert("Este navegador não suporta compartilhamento.");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full" style={{color: cor}}>
          <QrCodeIcon className="w-4 h-4 mr-2" />
          QR Code
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center gap-4 p-4 w-64">
        <div ref={qrRef}>
          <QRCodeSVG value={url} size={180} />
        </div>

        <div className="flex gap-2 flex-col">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1" />
            Imprimir
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-1" />
            Baixar
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-1" />
            Compartilhar
          </Button>
        </div>
      </PopoverContent >
    </Popover>
  );
}
