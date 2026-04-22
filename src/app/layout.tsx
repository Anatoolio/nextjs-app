import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { Header } from "@/app/components/UI/layouts/Header";
import { Logo } from "@/app/components/UI/layouts/Logo";
import { config } from "./config/config";
import { auth } from "@/auth/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next App",
  description: "Study Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider session={session}>
          <Header
            brand={
              <>
                <Link href="/" className="flex items-center gap-1">
                  <Logo />
                </Link>
                <p className="font-bold">NextJs</p>
              </>
            }
            items={config.navItems}
          />
          <main className="flex flex-col h-[calc(100vh-65px-52px)] w-full justify-start items-center">
            {children}
          </main>
          <footer className="bg-gray-100 h-52px py-4 flex justify-center items-center">
            <div className="container mx-auto text-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} My Next App. All rights
                reserved.
              </p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
