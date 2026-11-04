import type { Metadata } from "next";
import { Outfit, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import FundoFumaca from "@/components/fundo-fumaca";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breno Bronzere · Full Stack Developer",
  description:
    "Portfólio de Breno Bronzere: aplicações completas do back ao front, pagamentos, bots, infraestrutura e servidores de jogo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${outfit.variable} ${newsreader.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="relative isolate min-h-full flex flex-col">
        <FundoFumaca />
        <Navbar />
        <div className="page-rails mx-auto w-[calc(100%-2rem)] max-w-6xl flex-1 md:w-[calc(100%-6rem)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
