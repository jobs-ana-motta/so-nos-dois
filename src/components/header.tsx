import Image from "next/image";
import logo from "../../public/LogoSND.png";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b-[0.5px] border-gray-700 bg-card-foreground p-4">
      <Link href="/" className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4 text-white" />
        <Image
          src={logo}
          alt="Só-nós Dois"
          height={40}
          className="h-8 w-auto"
          quality={100}
        />
      </Link>
    </header>
  );
}
