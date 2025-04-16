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
    ? `linear-gradient(to top, ${casal.cor}, ${lighten(casal.cor, 0.2)})`
    : undefined;

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
      className={`min-h-screen p-4 flex justify-center items-center`}
      style={gradient ? { backgroundImage: gradient } : undefined}
    >
      <div className={`border border-[${casal?.cor}] rounded-xl p-4 h-full`}>
        <div
          className={`bg-white/80 shadow-xl rounded-lg p-6 w-full text-center relative ${`shadow-[${casal?.cor}]`}`}
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
            />
          </div>
          <h1
            className={`text-6xl text-[${casal ? casal.cor : ""}] mb-2 ${rouge.className}`}
          >
            {casal?.nome}
          </h1>
          <p className={`text-[${casal?.cor}] mb-4 font-poppins font-bold`}>
            Juntos à:
          </p>
          <Message
            color={casal ? casal?.cor : ""}
            date={casal ? casal.data : new Date()}
          />

            <div className={`flex flex-col gap-4 text-center text-foreground ${narnoor.className} p-2 max-w-[500px]`}>
              <p>
                Meu amor, hoje é o seu dia, e eu só quero te lembrar o quanto
                você é incrível e especial para mim. Você tem uma forma única de
                iluminar minha vida e me fazer sorrir todos os dias.
              </p>

              <p>
                Sou muito grato por ter você ao meu lado e por cada momento que
                passamos juntos. Que esse novo ano seja cheio de sonhos
                realizados, risadas, amor e tudo o que te faz feliz.
              </p>

              <p>
                Te amo demais, e vou continuar celebrando você, hoje e sempre!
                
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
