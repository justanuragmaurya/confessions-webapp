import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { Providers } from "./provider";
import Header from "@/components/header";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "LPU Confesions",
  description: "Made with love @LPU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={poppins.className}
      >
        <Providers>
          <Header/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
