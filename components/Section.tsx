import React, { FC } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

const SectionComponent: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className="h-full">
      <ScrollArea
        type="hover"
        scrollHideDelay={600}
        className={cn("w-full px-4 rounded-md h-[80vh]", className)}
      >
        {children}
      </ScrollArea>
    </div>
  );
};

export default SectionComponent;
