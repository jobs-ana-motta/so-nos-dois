"use client";
import Loading from "@/components/loading";
import { Message } from "@/components/timeTogether";
import { lighten } from "@/lib/rgbColor";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Narnoor, Rouge_Script } from "next/font/google";

interface Casal {
  cor: string;
  data: string;
  emoji: string;
  message: string;
  nome: string;
  paid: boolean;
  fotoUrl: string;
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
  const [timeTogether, setTimeTogether] = useState("");
  const [casal, setCasal] = useState<Casal | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const router = useRouter();
  const gradient = casal
    ? `linear-gradient(to top, ${casal.cor}, ${lighten(casal.cor, 0.4)})`
    : undefined;

  const cor = casal ? casal.cor : "white";

  useEffect(() => {
    async function loadCasal() {
      const response = await fetch(`/api/casal/${id}`);
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

  if (loading) {
    return <Loading />;
  }

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
            cor,
            0.1
          )}]`}`}
        >
          <div
            className="absolute inset-0 bg-[url('/sunflower.png')] bg-contain bg-no-repeat bg-bottom pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden flex justify-center">
            <Image
              src={casal ? casal.fotoUrl : ""}
              alt="Ana e Gui"
              width={401}
              height={640}
              quality={100}
              className="rounded-lg"
              priority={true}
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
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
            Juntos à:
          </p>
          <Message color={cor} date={casal ? casal.data : new Date()} />

          <div
            className={`flex flex-col gap-4 text-center font-bold ${narnoor.className} p-2 max-w-[500px]`}
            style={{ color: cor }}
          >
            <p>
            {casal ? casal.message : ""}
            </p>
          </div>
          <hr className="w-40"   style={{ border: `1px solid ${cor}` }}/>

          <h1 className="text-7xl">{casal ? casal.emoji : ""}</h1>
        </div>
      </div>
    </div>
  );
}
