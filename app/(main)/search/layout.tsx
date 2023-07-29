import Search from "@/components/Search";
import SectionComponent from "@/components/Section";
import { FC, ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

const LayoutSearch: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Search />
      <SectionComponent>{children}</SectionComponent>
    </>
  );
};

export default LayoutSearch;
