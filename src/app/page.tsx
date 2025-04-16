import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Check,
  Clock,
  Cloud,
  Gift,
  Heart,
  ImageIcon,
  Infinity,
  LinkIcon,
  Lock,
  Map,
  MessageSquare,
  Palette,
  Puzzle,
  QrCode,
  ScanLine,
  Smartphone,
  Smile,
  Sparkles,
  Star,
  Wine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  function PricingItem({ text }: { text: string }) {
    return (
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-gradient-to-r from-[#D22630]  p-0.5">
          <Check className="h-4 w-4 text-white/60" />
        </div>
        <span className="text-sm">{text}</span>
      </div>
    );
  }
  function IdeaCard({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) {
    return (
      <div className="group flex cursor-pointer flex-col rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm transition-all hover:border-[#D22630]/20 hover:shadow-lg hover:shadow-[#D22630]/5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D22630]/10 to-[#D22630]/10 group-hover:from-[#D22630]/20 group-hover:to-[#D22630]/20">
          <div className="text-[#D22630]">{icon}</div>
        </div>
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col bg-[#0B0B0B]">
      <Header />
      <main className="flex justify-center ">
        <div className="relative w-full  flex flex-col justify-center items-center overflow-hidden mt-20">


          <div className="md:container relative z-10 flex flex-col md:flex-row gap-8 w-full min-h-screen justify-center items-center">

            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 md:w-1/2 px-4">
              <div className="inline-flex animate-pulse items-center gap-2 rounded-full bg-[#D22630]/10 px-4 py-2 text-sm font-medium text-[#D22630]">
                <Sparkles className="h-4 w-4" />
                <span>Tecnologia a serviço do amor</span>
              </div>

              <h1 className=" text-2xl font-bold tracking-tight text-white/80 sm:text-5xl md:text-6xl">
                Preserve seu{" "}
                <span className="bg-[#D22630] bg-clip-text text-transparent">
                  amor
                </span>{" "}
                no universo digital
              </h1>

              <p className=" text-sm md:text-lg text-white/80/60">
                Crie uma página romântica com contador em tempo real, mensagens
                criptografadas e design exclusivo. Transforme seu relacionamento
                em uma experiência digital inesquecível.
              </p>

              <div className="flex gap-4 flex-wrap ">
                <div className="flex items-center gap-2 rounded-lg border border-border/10 bg-[#141414] px-3 py-2 backdrop-blur-sm w-full md:w-auto">
                  <Clock className="h-4 w-4 text-[#D22630]" />
                  <span className="text-xs">Contador em tempo real</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/10 bg-[#141414] px-3 py-2 backdrop-blur-sm w-full md:w-auto">
                  <Infinity className="h-4 w-4 text-[#D22630]" />
                  <span className="text-xs">Hospedagem contínua</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/10 bg-[#141414] px-3 py-2 backdrop-blur-sm w-full md:w-auto">
                  <Smartphone className="h-4 w-4 text-[#D22630]" />
                  <span className="text-xs">Design responsivo</span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-[#D22630] text-white/80 transition-all hover:shadow-lg hover:shadow-[#D22630]/20"
              >
                <Link href="/criar">Criar minha página agora</Link>
              </Button>
            </div>

            {/* IMAGEM COM EFEITO */}
            <div className="md:w-1/2 flex justify-center items-center relative">
              {/* Elipse brilhosa atrás da imagem */}
              <div className="absolute -z-10 h-[600px] w-[600px] rounded-full bg-[#D22630] opacity-20 blur-3xl" />

              <Image
                src="/foto-inicio.png"
                alt="Exemplo de página de casal"
                width={400}
                height={600}
                className="w-full h-auto max-w-md object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <section className="bg-[#141414]/5 py-8 p-4">
            <div className="container">
              <div className="mx-auto max-w-3xl rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#D22630] text-white/80">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">
                      Compartilhe com QR Code
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Cada página vem com um QR code exclusivo que pode ser
                      emoldurado, impresso em presentes ou compartilhado
                      digitalmente. Escaneie o código acima para ver um exemplo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 p-4">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <Badge
                  className="mb-4 bg-gradient-to-r from-[#D22630]/20 to-[#D22630]/20 text-[#D22630]"
                  variant={"secondary"}
                >
                  Investimento em memórias
                </Badge>
                <h2 className=" text-3xl font-bold tracking-tight text-white/80 sm:text-4xl">
                  Por menos que um buquê de flores
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Enquanto flores murcham em dias e jantares são esquecidos, sua
                  página digital permanece ao longo do tempo
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-[#D22630]">
                      R$34,99
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Pagamento único
                    </div>
                    <div className="mt-4 text-xs">
                      <span className="font-medium">Só-nós Dois</span>
                      <p className="mt-1 text-muted-foreground">
                        Memórias duradouras
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-muted-foreground">
                      R$150+
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Dura 1 semana
                    </div>
                    <div className="mt-4 text-xs">
                      <span className="font-medium">Buquê de flores</span>
                      <p className="mt-1 text-muted-foreground">Logo murcha</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-muted-foreground">
                      R$200+
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Dura 2 horas
                    </div>
                    <div className="mt-4 text-xs">
                      <span className="font-medium">Jantar romântico</span>
                      <p className="mt-1 text-muted-foreground">
                        Logo esquecido
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-full bg-[#D22630]/10 px-6 py-3 text-sm text-[#D22630]">
                  <span className="font-medium">Apenas R$0,09 por dia</span>{" "}
                  para memórias que duram para sempre
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 p-4">
            <div className="container">
              <div className="mb-12 text-center">
                <Badge
                  className="mb-2 bg-gradient-to-r from-[#D22630]/20 to-[#D22630]/20 text-[#D22630]"
                  variant={"secondary"}
                >
                  Processo digital
                </Badge>
                <h2 className=" text-3xl font-bold  sm:text-4xl">
                  Como funciona
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Três passos simples para preservar seu amor na nuvem
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="group relative rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm transition-all hover:border-[#D22630]/20 hover:shadow-lg hover:shadow-[#D22630]/5">
                  <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D22630] text-white/80 shadow-lg">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D22630]/10 text-[#D22630] group-hover:bg-[#D22630]/20">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">
                    Preencha o formulário
                  </h3>
                  <p className="text-muted-foreground">
                    Adicione seus nomes, data de início, mensagem especial e
                    escolha um emoji que represente vocês.
                  </p>
                </div>

                <div className="group relative rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm transition-all hover:border-[#D22630]/20 hover:shadow-lg hover:shadow-[#D22630]/5">
                  <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D22630] text-white/80 shadow-lg">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D22630]/10 text-[#D22630] group-hover:bg-[#D22630]/20">
                    <Palette className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Personalize</h3>
                  <p className="text-muted-foreground">
                    Escolha cores, adicione sua foto especial e crie um link
                    personalizado único para compartilhar.
                  </p>
                </div>

                <div className="group relative rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm transition-all hover:border-[#D22630]/20 hover:shadow-lg hover:shadow-[#D22630]/5">
                  <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D22630] text-white/80 shadow-lg">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D22630]/10 text-[#D22630] group-hover:bg-[#D22630]/20">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Preserve</h3>
                  <p className="text-muted-foreground">
                    Após o pagamento único de R$34,99, sua página fica online
                    continuamente na nuvem.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden  py-16 p-4">
            <div className="container relative z-10">
              <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/5   backdrop-blur-sm">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#D22630]/20 to-[#D22630]/20 blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#D22630]/20 to-[#D22630]/20 blur-3xl"></div>

                  <div className="relative z-10 p-8 sm:p-10">
                    <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                      <div>
                        <Badge
                          className="bg-gradient-to-r from-[#D22630]/20 to-[#D22630]/20 text-[#D22630]"
                          variant={"secondary"}
                        >
                          Oferta exclusiva
                        </Badge>
                        <h3 className="text-2xl font-bold">
                          Eternize seu amor
                        </h3>
                        <p className="text-muted-foreground">
                          Tecnologia a serviço do seu relacionamento
                        </p>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through">R$49,99</span>
                        </div>
                        <div className="bg-[#D22630]  bg-clip-text text-3xl font-bold text-transparent">
                          R$34,99
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pagamento único
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 grid gap-4 sm:grid-cols-2">
                      <PricingItem text="Página online para sempre" />
                      <PricingItem text="Contador em tempo real" />
                      <PricingItem text="Foto do casal em HD" />
                      <PricingItem text="Mensagem personalizada" />
                      <PricingItem text="Link exclusivo personalizado" />
                      <PricingItem text="Design responsivo" />
                      <PricingItem text="Suporte técnico" />
                      <PricingItem text="Atualizações gratuitas" />
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="group relative w-full overflow-hidden bg-gradient-to-r from-[#D22630]  text-white/80 transition-all hover:shadow-lg hover:shadow-[#D22630]/20"
                    >
                      <Link href="/criar">
                        <span className="relative z-10">
                          Criar minha página agora
                        </span>
                        <span className="absolute inset-0 h-full w-full bg-white opacity-0 transition-opacity group-hover:opacity-10"></span>
                      </Link>
                    </Button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4 text-[#D22630]" />
                      <span>Pagamento 100% seguro com criptografia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden py-16 p-4">
            <div className="container relative z-10">
              <div className="mb-12 text-center">
                <Badge
                  className="bg-gradient-to-r from-[#D22630]/20 to-[#D22630]/20 text-[#D22630]"
                  variant={"secondary"}
                >
                  Surpreenda
                </Badge>
                <h2 className=" text-3xl font-bold tracking-tight sm:text-4xl">
                  10 Formas de Impressionar
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Transforme sua página digital em um presente inesquecível com
                  estas ideias criativas
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <IdeaCard
                  icon={<ImageIcon className="h-6 w-6" />}
                  title="Quadro QR Code"
                  description="Emoldure um QR code elegante com a frase 'Escaneie quando precisar lembrar do nosso amor' para momentos difíceis."
                />
                <IdeaCard
                  icon={<Map className="h-6 w-6" />}
                  title="Caça ao Tesouro"
                  description="Crie uma caça ao tesouro com pistas românticas que levam ao QR code da página de vocês como surpresa final."
                />
                <IdeaCard
                  icon={<Gift className="h-6 w-6" />}
                  title="Cápsula do Tempo"
                  description="Entregue uma pequena caixa decorada como uma 'cápsula do tempo digital' com acesso à página de vocês."
                />
                <IdeaCard
                  icon={<Wine className="h-6 w-6" />}
                  title="Garrafa Personalizada"
                  description="Personalize uma garrafa de vinho com uma etiqueta que inclua o QR code para brindar enquanto veem o contador."
                />
                <IdeaCard
                  icon={<Puzzle className="h-6 w-6" />}
                  title="Quebra-cabeça Revelador"
                  description="Crie um quebra-cabeça que, quando montado, revela o QR code no centro como uma surpresa lúdica."
                />
                <IdeaCard
                  icon={<Star className="h-6 w-6" />}
                  title="Estrela Batizada"
                  description="Registre uma estrela com o nome de vocês e inclua o acesso à página: 'duradouro em todos os universos'."
                />
              </div>

              <div className="mt-12 rounded-xl border border-white/5 bg-[#141414]/50 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">
                      Transforme R$34,99 em memórias duradouras
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Enquanto flores murcham e chocolates acabam, sua página
                      digital permanece ao longo do tempo, pronta para emocionar
                      em qualquer momento especial.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#D22630] to-[#D22630] text-white/80 transition-all hover:shadow-lg hover:shadow-[#D22630]/20"
                  >
                    <Link href="/criar">Criar minha surpresa</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section id="criar" className="py-20 p-4">
            <div className="container">
              <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-r from-[#D22630]  p-1">
                <div className="rounded-xl bg-[#0B0B0B] p-8 text-center sm:p-12">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D22630]  text-white/80">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h2 className="text-[#D22630] text-3xl font-bold sm:text-4xl">
                    Preserve seu amor hoje mesmo
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Por apenas{" "}
                    <span className="font-bold text-[#D22630]">R$34,99</span>,
                    crie uma página única e surpreenda com um presente que
                    combina tecnologia e romantismo.
                  </p>
                  <div className="mt-8 inline-flex items-center  rounded-full border border-[#D22630]/20 bg-[#D22630]/5 px-4 py-2 text-sm text-[#D22630]">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Oferta por tempo limitado</span>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="mt-8 bg-[#D22630] text-white/80 transition-all hover:shadow-lg hover:shadow-[#D22630]/20"
                  >
                    <Link href="/criar">Criar minha página agora</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
