"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

export default function Gratidao() {

  const [casal, setCasal] = useState<any>(null);
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    async function loadCasal() {
      const response = await fetch(`/api/casal/${id}`);
      const data = await response.json();

      setCasal(data);
      if(response.status == 404) {
        router.push("/404");
      }else { 
        setLoading(false)
      }
    }

    if(id) { 
        loadCasal();
    }else {
       router.push("/404");
    }
  }, [id]);


  if (loading) {
    return (
        <Loading/>
    )
  }
 

  return (
    <div className="flex w-full h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-2">
        <div className="flex items-center flex-col p-4 bg-[#1f1f1f] rounded shadow-md gap-4 md:min-w-[768px]">
          <div className="rounded-full bg-[#D22630]/10 p-3">
            <CheckCircle2 className="h-12 w-12 text-[#D22630]" />
          </div>
          <Image
            src="/LogoSND.png"
            alt="Só-nós Dois"
            className="scale-75 md:scale-100"
            width={300}
            height={300}
          />
          <div className="max-w-6/8 md:max-w-5/8 text-center flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">
              Página criada com sucesso!
            </h1>
            <p className="text-center text-gray-400 font-semibold">
              Sua página está linda! Fale com a gente no WhatsApp para ativar
              sua página romântica. 💖
            </p>
            <div className="flex flex-col gap-3">
              { !casal.paid ? 
              <a
                href="https://api.whatsapp.com/send?phone=5543999274825"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#D22630] w-full cursor-pointer hover:brightness-105 transition-all ease-in">
                  Converse com a gente aqui <PhoneCall />{" "}
                </Button>
              </a> : 
                
                <Button 
                className="bg-[#D22630] w-full cursor-pointer hover:brightness-105 transition-all ease-in"
                onClick={() => router.push(`${id}`)}
                >
                Clique aqui para ver o sua pagina ! 
              </Button>
              }
              <Button 
                className="w-full cursor-pointer bg-[#1f1f1f] border-[0.5px]"
                onClick={() => router.push("/")}
                >
                Voltar para o início 
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
