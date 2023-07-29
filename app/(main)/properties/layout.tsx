import PropertiesNav from "@/components/PropertiesNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Properties",
};

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
      {children}
    </>
  );
}
