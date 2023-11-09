import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getBaseUrl } from "@/lib/getBaseUrl";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Nekomoe",
    template: "%s | Nekomoe",
  },
  description: "Nonton anime subtitle Indonesia Gratis tanpa Iklan!",
  openGraph: {
    title: "Nekomoe",
    description: "Nonton anime subtitle Indonesia Gratis tanpa Iklan!",
    url: process.env.BASE_URL,
    siteName: "Nekomoe",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Nekomoe",
    card: "summary_large_image",
  },
  verification: {
    google: "3v0dsIPpvXYg0uLN3qF9I-1rOsCAcI1roNu2C0oPk64",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="#4ade80" showSpinner={false} />
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="a2f6a39d-27c9-4c55-9654-ebb1b3e73353"
        ></Script>
      </body>
    </html>
  );
}
