import SectionComponent from "@/components/Section";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Finished",
};

export default function FinishedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionComponent>{children}</SectionComponent>;
}
