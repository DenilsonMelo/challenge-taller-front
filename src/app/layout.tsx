import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consultoria e Desenvolvimento de Software | Taller",
  description:
    "Somos uma empresa de Consultoria em Estratégia, Design e Desenvolvimento de software que vai te ajudar a ter sucesso no mundo digital.  Não tenha dor de cabeça com fábricas de software, fale com Taller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${archivo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
