import RootLayoutGrid from "@/components/RootLayoutGrid";
import SectionComponent from "@/components/Section";
import React, { FC } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <RootLayoutGrid>
      <SectionComponent>{children}</SectionComponent>
    </RootLayoutGrid>
  );
};

export default MainLayout;
