import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import React from "react";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Nekomoe",
    template: "%s | Nekomoe",
  },
  description: "Nonton anime subtitle Indonesia Gratis!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="#ff0080" showSpinner={false} />
        <Providers>
          {children}
          <footer className="h-[10vh] p-1">
            <div className="flex justify-between w-full">
              <div>Footer</div>
              <div>Footer</div>
              <div>Footer</div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
