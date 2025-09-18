"use client";
import Loading from "@/components/loading";
import { Message } from "@/components/timeTogether";
import { lighten } from "@/lib/rgbColor";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Narnoor, Rouge_Script } from "next/font/google";
import { QrSharePopover } from "@/components/qrcode";
import {
} from "@/components/ui/carousel";
import ImagePreview from "@/components/imagePreview";

interface Casal {
  cor: string;
  data: string;
  emoji: string;
  message: string;
  nome: string;
  paid: boolean;
  fotoUrl: string;
  idMusic : string;
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

export default function PageCasal() {
  const [casal, setCasal] = useState<Casal | null>(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const router = useRouter();
  

  const cor = casal ? casal.cor : "white";

  useEffect(() => {
    async function loadCasal() {
      const response = await fetch(`/api/casal/${id}`);

      if(!response.ok) { 
        router.push("/404");
        return;
      }

      const data = await response.json();

      setCasal(data);
      if (response.status == 404) {
        router.push("/404");
      } else {
        setLoading(false);
      }
    }

    if (id) {
      loadCasal();
    } else {
      router.push("/404");
    }
  }, []);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (loading || !casal) {
    return <Loading />;
  }

  const gradient = casal.cor
    ? `linear-gradient(to top, ${casal.cor}, ${lighten(casal.cor, 0.4)})`
    : undefined;

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
          className={`bg-white/80 shadow-xl rounded-lg p-3 max-w-[450px] text-center flex justify-center flex-col items-center gap-3 relative ${`shadow-[${lighten(
            cor,
            0.1
          )}]`}`}
        >
          <div
            className="absolute inset-0 bg-[url('/sunflower.png')] bg-contain bg-no-repeat bg-bottom pointer-events-none"
            aria-hidden="true"
          />
          <iframe
            src={`https://open.spotify.com/embed/track/${casal?.idMusic}?utm_source=generator&theme=1`}
            width="100%"
            height="100"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden flex justify-center">
            <ImagePreview src={casal?.fotoUrl!} />
          </div>
          <h1
            className={`text-6xl mb-2 ${rouge.className}`}
            style={{ color: cor }}
          >
            {casal?.nome}
          </h1>
          <p
            className={` mb-4 font-poppins font-bold ${narnoor.className}`}
            style={{ color: cor }}
          >
            Juntos há:
          </p>
          <Message color={cor} date={casal ? casal.data : new Date()} />

          <div
            className={`flex flex-col gap-4 text-center font-bold ${narnoor.className} p-2 max-w-[500px]`}
            style={{ color: cor }}
          >
            <p>{casal ? casal.message : ""}</p>
          </div>
          <hr className="w-40" style={{ border: `1px solid ${cor}` }} />

          <h1 className="text-7xl">{casal ? casal.emoji : ""}</h1>

          <QrSharePopover url={url} cor={cor} />
        </div>
      </div>
    </div>
  );
}
