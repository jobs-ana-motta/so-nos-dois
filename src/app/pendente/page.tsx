"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import logo from "../../../public/LogoSND.png";
import { AlertCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Pendente() {
  const router = useRouter();
  return (
    <div className="flex w-full h-screen flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center">
        <div className="flex items-center flex-col p-4  bg-[#1f1f1f] rounded shadow-md gap-4 md:min-w-[768px]">
          <div className="rounded-full bg-[#D22630]/10 p-3">
            <AlertCircle className="h-12 w-12 text-[#D22630]" />
          </div>

          <Image
            alt="logo"
            className="scale-75 md:scale-100"
            src={logo}
            quality={100}
            height={300}
            width={200}
          />

          <div className="max-w-6/8 md:max-w-5/8 text-center flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">
              Seu pagamento está pendente!
            </h1>
            <p className="text-center text-gray-400 font-semibold">
              Para ativar, envie o comprovante para (xx) xxxxx-xxxxx. ❤️
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  window.open(
                    "https://api.whatsapp.com/send?phone=5543999274825",
                    "_blank"
                  );
                }}
                className="bg-[#D22630] w-full cursor-pointer hover:brightness-105 transition-all ease-in"
              >
                Enviar comprovante <PhoneCall />{" "}
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="w-full cursor-pointer bg-[#1f1f1f] border-[0.5px] hover:brightness-105 transition-all ease-in"
              >
                Voltar para o inicio
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
