"use client";

import React, { useState } from "react";

import {
  ResizableHorizontalGrid,
  GridState,
  isHorizontalGrid,
} from "react-resizable-collapsible-grid";

import useWindowSize from "@/lib/hooks/use-window-size";
import { AspectRatio } from "./ui/aspect-ratio";
import MainNav from "./MainNav";

function RootLayoutGrid({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useWindowSize();
  const [leftSize, setLeftSize] = useState(250);
  const [rightSize, setRightSize] = useState(300);
  const getGridState = (gridState: GridState) => {
    if (isHorizontalGrid(gridState)) {
      // Resizable Horizontal Grid
      // console.log(gridState.left.currentSize);
      if (Number(gridState.left.currentSize) < 305) {
        setLeftSize(150);
      } else {
        setRightSize(300);
      }
    } else {
      // Resizable Vertical Grid
    }
  };

  return (
    <ResizableHorizontalGrid
      initialWidths={{ left: leftSize, right: rightSize }}
      getCurrentState={getGridState}
      minWidth={leftSize}
      collapseLeft={!isDesktop}
      collapseRight={!isDesktop}
      gridId={5}
      className="w-screen grid"
    >
      <MainNav />
      <main className="h-[90vh] min-w-fit md:p-1">{children}</main>
      <aside className="z-10 p-1 flex flex-col gap-y-2 bg-background hover:border-l border-zinc-700">
        <div className="bg-zinc-100 dark:bg-zinc-900 h-full rounded-md overflow-hidden p-4 ">
          <div className=" max-h-80 rounded-md overflow-hidden h-full w-full mx-auto max-w-sm">
            <AspectRatio ratio={3 / 4}>
              <div className="w-full h-full shadow-sm shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
            </AspectRatio>
          </div>
        </div>
      </aside>
    </ResizableHorizontalGrid>
  );
}

export default RootLayoutGrid;
