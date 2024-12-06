"use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import Chatbot from "@/components/chatbot/Chatbot";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  // Rutas donde no quieres mostrar el Navbar
  const rutasSinNavbar = ["/stripe/pay/success/checkout/session"];

  const mostrarNavbar = !rutasSinNavbar.includes(pathname);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
        {mostrarNavbar && <Navbar />}
          <main className="flex-grow">{children}</main>
          <Chatbot />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
