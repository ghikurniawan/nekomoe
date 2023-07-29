import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Details",
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
