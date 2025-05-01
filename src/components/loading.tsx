import Footer from "@/components/footer";
import Header from "@/components/header";
import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex w-full h-screen flex-col">
      <main className="flex-1 flex items-center justify-center gap-2">
           <p className="font-semibold text-gray-400 opacity-90">Carregando...</p> <Loader className="h-5 w-5 animate-spin"/>
      </main>
      <Footer />
    </div>
  );
}
