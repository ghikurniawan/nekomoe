import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ongoing",
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
