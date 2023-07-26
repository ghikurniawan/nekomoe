"use client";

import { Button } from "@/components/ui/button";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import {
  CaretLeftIcon,
  CaretRightIcon,
  DesktopIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { ToggleModeMachine } from "@/lib/state-machine/ToggleModeMachine";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNav from "./MainNav";
import useWindowSize from "@/lib/hooks/use-window-size";

const Topbar = () => {
  const [current, send] = useMachine(ToggleModeMachine);
  const { setTheme, theme } = useTheme();
  const scrolled = useScroll(20);
  const router = useRouter();
  const { isMobile } = useWindowSize();

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
        <div className="space-x-4 flex">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={cn("bg-background/50")}
                >
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetLeft />
            </Sheet>
          )}
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
            <GitHubLogoIcon className="mr-2" />
            Contribution
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

export default Topbar;

const SheetLeft = () => {
  return (
    <SheetContent side={"left"} className="w-[300px] sm:w-[300px] p-2">
      <MainNav />
    </SheetContent>
  );
};
