"use client";
import Loading from "@/components/loading";
import { Message } from "@/components/timeTogether";
import { lighten } from "@/lib/rgbColor";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Narnoor, Rouge_Script } from "next/font/google";
import { QrSharePopover } from "@/components/qrcode";
import ImagePreview from "./imagePreview";

interface Casal {
  cor: string;
  data: string | null;
  emoji: string;
  message: string;
  nome: string;
  fotosUrl: string[] | null;
  trackId: string | null;
}

const narnoor = Narnoor({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-narnoor",
});

const rouge = Rouge_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rouge",
});

export default function Preview( obj : Casal | undefined ) {

  if(!obj) {
    return (
      <div>
        Ocorreu um erro ao exibir a sua foto, por favor entre em contato com o suporte :(
      </div>
    )
  }


  const gradient = `linear-gradient(to top, ${obj.cor}, ${lighten(obj.cor, 0.4)})`;

  return (
    <div
      className={`min-h-screen p-2 flex justify-center items-center`}
      style={gradient ? { backgroundImage: gradient } : undefined}
    >
      <div
        className={`rounded-xl p-2 h-full my-3`}
        style={{ border: `1px solid white` }}
      >
        <div
          className={`bg-white/80 shadow-xl rounded-lg p-3 w-full text-center flex justify-center flex-col items-center gap-3 relative ${`shadow-[${lighten(
            obj.cor,
            0.1
          )}]`}`}
        >
          <div
            className="absolute inset-0 bg-[url('/sunflower.png')] bg-contain bg-no-repeat bg-bottom pointer-events-none"
            aria-hidden="true"
          />

          {obj.trackId && (
            <iframe
              src={`https://open.spotify.com/embed/track/${obj.trackId}?utm_source=generator`}
              width="100%"
              height="100"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}

          {obj.fotosUrl && (
            <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden flex justify-center">
              <ImagePreview src={obj.fotosUrl} />
            </div>
          )}
          <h1
            className={`text-6xl mb-2 ${rouge.className}`}
            style={{ color: obj.cor }}
          >
            {obj.nome}
          </h1>
          <p
            className={` mb-4 font-poppins font-bold ${narnoor.className}`}
            style={{ color: obj.cor }}
          >
            Juntos há:
          </p>

          {obj.data && <Message color={obj.cor} date={obj.data} />}

          <div
            className={`flex flex-col gap-4 text-center font-bold ${narnoor.className} p-2 w-[320px]`}
            style={{ color: obj.cor }}
          >
            <p className="break-words">{obj.message}</p>
          </div>
          <hr className="w-40" style={{ border: `1px solid ${obj.cor}` }} />

          <h1 className="text-7xl">{obj.emoji}</h1>

          <QrSharePopover url={""} cor={obj.cor} />
        </div>
      </div>
    </div>
  );
}
