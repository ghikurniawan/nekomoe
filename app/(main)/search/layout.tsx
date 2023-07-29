import Search from "@/components/Search";
import { FC, ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

const LayoutSearch: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Search />
      {children}
    </>
  );
};

export default LayoutSearch;
