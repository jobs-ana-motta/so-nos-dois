"use client";

import Image from "next/image";
import logo from "../../public/LogoSND.png";
import Link from "next/link";
import { ChevronLeft, PhoneCall } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Header() {
  const pathname = usePathname();
    const router = useRouter();
  return (
    <header className="w-full border-b-[0.5px] border-white/5 bg-card-foreground/50 backdrop-blur-sm p-4 flex justify-between fixed z-50">
      <Link href="/" className="flex items-center gap-2">
      {pathname !== "/" && (
        <ChevronLeft className="h-4 w-4 text-white" />)}
        <Image
          src={logo}
          alt="Só-nós Dois"
          height={40}
          className="h-8 w-auto"
          quality={100}
        />
      </Link>

      {pathname === "/" && (
        <Button
          onClick={() => {
            router.push("/criar")
          }}
          className="bg-[#D22630] cursor-pointer hover:brightness-105 transition-all ease-in"
        >
          Criar minha página
        </Button>
      )}
    </header>
  );
}
