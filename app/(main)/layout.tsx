import RootLayoutGrid from "@/components/RootLayoutGrid";
import Topbar from "@/components/Topbar";
import React, { FC } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <RootLayoutGrid>
      <div className="h-full min-w-[30vw] rounded-md overflow-hidden bg-gradient-to-t from-zinc-100 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <Topbar />
        {children}
      </div>
    </RootLayoutGrid>
  );
};

export default MainLayout;
