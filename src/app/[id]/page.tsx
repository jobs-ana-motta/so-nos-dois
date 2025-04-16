"use client";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function PageCasal() {
  const [timeTogether, setTimeTogether] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const startDate = new Date("2021-03-09T18:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      //@ts-ignore
      const diff = now - startDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether(
        `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-yellow-300 to-yellow-100 p-4 flex justify-center items-center">
      <div className="border border-amber-800 rounded-xl p-4 h-full">
        <div className="bg-yellow-50 shadow-xl shadow-[#CA8A04] rounded-lg p-6 w-full text-center relative">
          <div
            className="absolute inset-0 bg-[url('/sunflower.png')] bg-contain bg-no-repeat bg-bottom pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
            <Image
              src="/fotinha.jpeg"
              alt="Ana e Gui"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-6xl text-amber-800 mb-2 font-parisienne">
            Ana e Gui
          </h1>
          <p className="text-amber-600 mb-4 font-poppins">Juntos à:</p>
          <p className="text-yellow-800 font-sulphur_point font-bold">
            {timeTogether}
          </p>
          <div className="relative h-10 mt-8">
            <Image
              src="/girassol.png"
              alt="Ana e Gui"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex justify-center mt-4">

          <hr  className="w-40 border-none bg-yellow-500 h-0.5 "/>
          </div>
        </div>
      </div>
    </div>
  );
}