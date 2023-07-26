"use client";

import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const Player: FC<{
  source: { episode: string; type: string; size: string | number }[];
  className?: string;
}> = ({ source, className }) => {
  const [isClient, setIsClient] = useState(false);
  const [defaultSource, setDefaultSource] = useState(0);
  const [url, setUrl] = useState("");
  const [muted, setMuted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const defaultUrl = source[defaultSource].episode;
    setUrl(defaultUrl);
    setMuted(false);
  }, [defaultSource, source]);

  function handleError(
    error: any,
    data?: any,
    hlsInstance?: any,
    hlsGlobal?: any
  ): void {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    console.log(error, hlsGlobal, hlsInstance, data);
  }

  function handlePipStart(): void {
    window?.open("/", "_blank");
  }

  return (
    <div className="relative w-full h-full">
      {isClient && (
        <ReactPlayer
          className={cn("mx-auto", className)}
          url={url}
          muted={muted}
          onError={handleError}
          onEnablePIP={handlePipStart}
          controls
          progressInterval={3000}
          pip={true}
          stopOnUnmount={false}
          fallback={
            <div className="w-full h-full shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
          }
          playing={false}
          volume={0.5}
          width={"100%"}
          height={"100%"}
        />
      )}
      <div className="absolute top-2 left-2">
        <Select onValueChange={(v) => setDefaultSource(Number(v))}>
          <SelectTrigger className="w-[100px] border-none bg-background/5">
            <SelectValue placeholder="720p" />
          </SelectTrigger>
          <SelectContent>
            {source?.map((s, i) => (
              <SelectItem
                key={s.episode}
                value={i as unknown as string}
                className="text-accent-foreground"
              >
                {s.size}p
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Player;
