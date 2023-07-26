import React, { FC } from "react";
import { ScrollArea } from "./ui/scroll-area";

const SectionComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full rounded-md">
      <div className="h-full">
        <ScrollArea
          type="hover"
          scrollHideDelay={600}
          className="w-full h-[85vh] px-4"
        >
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SectionComponent;
