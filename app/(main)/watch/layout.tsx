import SectionComponent from "@/components/Section";
import React from "react";

export default function LayoutWatch({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionComponent>{children}</SectionComponent>;
}
