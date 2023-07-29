import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Watch",
};

export default function LayoutWatch({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
