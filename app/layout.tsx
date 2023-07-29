import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import React, { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";

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

const UMAMI_TOKEN = process.env.UMAMI_TOKEN;

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
          <footer className="h-[10vh] p-1">
            <div className=" grid grid-cols-5 w-full px-4">
              <div className=" col-span-1"></div>
              <div className="col-span-3 flex flex-col items-center justify-center">
                <Link href={"/"}>
                  <Logo className="w-10 h-10 mx-auto" />
                  <div className="font-bold text-xl text-foreground/50">
                    Neko<span className="text-green-400">moe</span>
                  </div>
                </Link>
              </div>
              <div className=" col-span-1 flex items-center justify-end">
                {UMAMI_TOKEN && (
                  <Link href={"/analytics"} target="_blank">
                    <Button variant={"outline"} className="rounded-full">
                      <Suspense fallback={"Loading..."}>
                        <ActiveViews />
                      </Suspense>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </footer>
        </Providers>
        <Analytics />
        <Script
          async
          src="https://iwwwan-umami.vercel.app/script.js"
          data-website-id="5af5b555-c821-4ec0-876c-1a5e0174df18"
        ></Script>
      </body>
    </html>
  );
}

const ActiveViews = async () => {
  const response = await fetch(
    "https://iwwwan-umami.vercel.app/api/websites/5af5b555-c821-4ec0-876c-1a5e0174df18/active",
    {
      headers: {
        Authorization: `Bearer ${UMAMI_TOKEN}`,
        cache: "no-store",
      },
    }
  );

  const active: { x: string }[] = await response.json();

  return (
    <>
      {active?.map((n) => n.x)} <EyeOpenIcon className="ml-2" />
    </>
  );
};
