import PropertiesNav from "@/components/PropertiesNav";
import SectionComponent from "@/components/Section";
import React from "react";

export default function LayoutProperties({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4">
        <PropertiesNav />
      </div>
      <SectionComponent>{children}</SectionComponent>
    </>
  );
}
