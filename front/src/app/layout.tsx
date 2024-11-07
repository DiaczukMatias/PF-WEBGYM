"use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userSession");
    if (
      !storedUserData &&
      (pathname.includes("/dashboard") ||
        pathname === "/cart" ||
        pathname === "/nuevo")
    ) {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}