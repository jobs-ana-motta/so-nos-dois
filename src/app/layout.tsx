import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const popins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});


export const metadata: Metadata = {
  title: "Só nós dois",
  description: "Romaticos de plantão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${popins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
