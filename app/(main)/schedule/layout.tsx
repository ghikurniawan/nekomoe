import React from "react";
import { Metadata } from "next";
import ScheduleNav from "@/components/ScheduleNav";

export const metadata: Metadata = {
  title: "Schedule",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4">
        <ScheduleNav />
      </div>
      {children}
    </>
  );
}
