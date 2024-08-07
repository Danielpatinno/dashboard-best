import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Best Pizza",
  description: "Dashboard do delivery de pizza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="flex">
          <div className="w-32"> 
            <Sidebar />
          </div>
          <div className="ml-2 flex-1"> 
            <Header />
            {children}
            <Toaster />
          </div>
        </section>
      </body>
    </html>
  );
}
