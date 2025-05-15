import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="en">
      
      <body className="bg-yellow-50 min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
