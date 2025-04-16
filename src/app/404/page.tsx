import Footer from "@/components/footer";
import Header from "@/components/header";

export default function NotFound() { 
    return (
        <div className="flex w-full h-screen flex-col"> 
                    <Header />
                    <main className="flex flex-1 items-center justify-center p-2">
                        <p>Parece que sua pagina não foi encontrada</p>
                    </main>
                    <Footer />
        </div>
    )
}