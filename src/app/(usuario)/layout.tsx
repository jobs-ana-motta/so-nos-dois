import Header from "@/components/header";

export default function ApresentacaoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <p>teste</p>
      {children}
    </>
  );
}
