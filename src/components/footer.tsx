import Image from "next/image";
import logo from "../../public/LogoSND.png";

export default function Footer() {
  return (
    <footer className="border-t-[0.1px] border-white/5 bg-card-foreground py-6 w-full">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={logo}
            alt="Só-nós Dois"
            width={80}
            height={30}
            className="h-5 w-auto"
          />
        </div>
        <p className="mt-2 text-center">
          © {new Date().getFullYear()} Só-nós Dois. Todos os direitos
          reservados.
        </p>
    </footer>
  );
}
