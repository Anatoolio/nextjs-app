import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { Header } from "@/app/components/UI/layouts/Header";
import { LogoBox } from "@/app/components/UI/layouts/Logo";
import { siteConfig } from "./config/siteConfig";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "./components/UI/layouts/Title";

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
          <AppLoader>
            <Header brand={<LogoBox />} items={siteConfig.navItems} />
            <Title />
            <main className="flex flex-col h-[calc(100vh-65px-52px)] max-w-[1024px ] justify-start mx-auto px-[24px] items-center">
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
          </AppLoader>
        </SessionProvider>
      </body>
    </html>
  );
}
