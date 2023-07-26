import Search from "@/components/Search";
import SectionComponent from "@/components/Section";
import { FC, ReactNode } from "react";

const LayoutSearch: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Search />
      <SectionComponent>{children}</SectionComponent>
    </>
  );
};

export default LayoutSearch;
