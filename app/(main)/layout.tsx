"use client";

import RootLayoutGrid from "@/components/RootLayoutGrid";
import { Button } from "@/components/ui/button";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import {
  CaretLeftIcon,
  CaretRightIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { ToggleModeMachine } from "@/lib/state-machine/ToggleModeMachine";

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

const Topbar = () => {
  const [current, send] = useMachine(ToggleModeMachine);
  const { setTheme, theme } = useTheme();
  const scrolled = useScroll(20);
  const router = useRouter();

  useEffect(() => {
    send(theme as "light" | "dark" | "system");
  }, [theme, send]);

  const handleToggleTheme = () => {
    if (current.value === "system") {
      setTheme("light");
    } else if (current.value === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };
  return (
    <div
      className={cn(
        `${
          scrolled ? "border-b bg-background/50 backdrop-blur-xl" : ""
        } sticky top-0 transition-all p-4`
      )}
    >
      <div className="flex justify-between">
        <div className="space-x-4">
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn("bg-background rounded-full")}
            onClick={() => router.back()}
          >
            <CaretLeftIcon className="w-6 h-6" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn("bg-background rounded-full")}
            onClick={() => router.forward()}
          >
            <CaretRightIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            variant={"default"}
            size={"sm"}
            className={cn("rounded-full")}
          >
            Explore Premium
          </Button>
          {current.value !== "system" && (
            <Button
              variant="ghost"
              size="icon"
              className={cn("bg-background rounded-full")}
              onClick={handleToggleTheme}
            >
              <SunIcon className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          {current.value === "system" && (
            <Button
              variant="ghost"
              size="icon"
              className={cn("bg-background rounded-full")}
              onClick={handleToggleTheme}
            >
              <DesktopIcon className="w-4 h-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
