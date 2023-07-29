"use client";

import React, { FC, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Topbar from "./Topbar";

const SectionComponent: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [scrolled, setScrolled] = useState(0);

  const handleScroll = (event: any) => {
    setScrolled(event.target.scrollTop);
  };

  return (
    <ScrollArea.Root
      type="hover"
      scrollHideDelay={600}
      className="w-full h-[95vh] rounded overflow-hidden"
    >
      <ScrollArea.Viewport
        className="w-full h-full rounded"
        onScroll={handleScroll}
      >
        <div className="h-full pb-4 relative min-w-[30vw] rounded-md bg-gradient-to-t from-zinc-100 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
          <Topbar scrolled={scrolled} />
          {children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none pr-px transition-colors duration-150  data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-zinc-300 dark:bg-zinc-800 mt-16 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-zinc-300" />
    </ScrollArea.Root>
  );
};

export default SectionComponent;
