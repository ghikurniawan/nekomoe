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
// import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/lib/hooks/use-local-storage";

const DEFAULT_PLAY_VALUE = {
  stream_server: "archive",
};

const Player: FC<{
  source: { episode: string; type: string; size: string | number }[];
  className?: string;
}> = ({ source, className }) => {
  const [defaultPlayValue, setDefaultPlayValue] = useLocalStorage(
    "playstorage",
    DEFAULT_PLAY_VALUE
  );
  const [isClient, setIsClient] = useState(false);
  const [defaultSource, setDefaultSource] = useState(0);
  const [url, setUrl] = useState("");
  const [muted, setMuted] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const defaultUrl = source[defaultSource]?.episode;
    setUrl(defaultUrl);
    setMuted(false);
  }, [defaultSource, source]);
  
  useEffect(() => {
    console.log(source)
  }, [source]);

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
        description: "Vidio tidak ditemukan di server ini.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    console.log(error, hlsGlobal, hlsInstance, data);
  }

  function handlePipStart(): void {
    window?.open("/", "_blank");
  }

  const handleServerChange = (value: string): void => {
    setDefaultPlayValue({ ...defaultPlayValue, stream_server: value });
    router.push(`${pathName}?stream_server=${value}&page=${page ? page : ""}`);
  };

  if (source.length === 0) {
    return (
      <div>
        <p>Source tida ditemukan di server ini, coba server lain</p>
      </div>
    );
  }
  const server = [
    {
      title: "Server 1",
      value: "archive",
    },
    {
      title: "Server 2",
      value: "archive-v2",
    },
    {
      title: "Server 3",
      value: "kuramadrive",
    },
    {
      title: "Server 4",
      value: "kuramadrive-v2",
    },
  ];

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
      <div className="absolute top-2 right-2">
        <Select onValueChange={handleServerChange}>
          <SelectTrigger className="w-[100px] border-none bg-background/5">
            <SelectValue placeholder="Server" />
          </SelectTrigger>
          <SelectContent>
            {server.map((server) => (
              <SelectItem
                key={server.title}
                value={server.value}
                className="text-accent-foreground"
              >
                {server.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Player;
