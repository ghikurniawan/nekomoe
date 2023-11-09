import Sponsors from "@/components/Sponsors";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFinishedAnime } from "@/lib/getFinishedAnime";
import { getOngoingAnime } from "@/lib/getOngoingAnime";
import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <div className="max-h-[35vh] absolute top-0 h-full w-full mx-auto">
        <div className="w-full h-full bg-gradient-to-t from-zinc-100 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800"></div>
      </div>
      <div className="space-y-4 px-4">
        <div className="h-[28vh]">
          <Sponsors />
        </div>

        <div className="flex justify-between">
          <h3 className="font-semibold ">On Going</h3>
          <Link
            href={"/ongoing"}
            className="text-muted-foreground hover:text-foreground"
          >
            Show all
          </Link>
        </div>

        <Suspense fallback={<GridFallback />}>
          <OnGoing />
        </Suspense>

        <div className="flex justify-between">
          <h3 className="font-semibold ">Finished</h3>
          <Link
            href={"/finished"}
            className="text-muted-foreground hover:text-foreground"
          >
            Show all
          </Link>
        </div>
        <Suspense fallback={<GridFallback />}>
          <Finished />
        </Suspense>
      </div>
    </>
  );
}

const GridFallback = () => {
  return Array.from({ length: 18 }, (_, index) => index + 1).map((l) => (
    <Card key={l} className="border rounded-md overflow-hidden bg-transparent">
      <AspectRatio ratio={3 / 4}>
        <div className="w-full h-full before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
      </AspectRatio>
    </Card>
  ));
};

type RecentType = {
  title: string;
  animeId: string;
  image: string;
  episode: string;
};

const OnGoing = async () => {
  const onGoing = await getOngoingAnime();
  if (onGoing?.message) {
    return (
      <div className="text-center">
        <p>{onGoing.message}</p>
      </div>
    );
  }
  if (onGoing?.data.length === 0) {
    return (
      <div className="text-center">
        <p>Anime tidak ditemukan</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {onGoing?.data.map((d: RecentType) => (
          <Card
            key={d.animeId}
            className="group border rounded-md overflow-hidden bg-transparent"
          >
            <AspectRatio ratio={3 / 4} className="bg-muted relative">
              <Link
                href={`/details${d.animeId.replace('https://kuramanime.vip', '')}`}
                className="absolute inset-0 w-full group-focus:outline"
              >
                <Image
                  src={d.image}
                  alt={d.title}
                  height={640}
                  width={480}
                  className="w-full h-full object-cover"
                />
                <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 h-2/4 group-hover:h-full transition-all bg-gradient-to-t from-zinc-100 to-zinc-100/0 dark:from-zinc-900 dark:to-zinc-900/0">
                  <div className="opacity-0 p-2 group-hover:opacity-100 rounded-full bg-green-600 hover:bg-green-700">
                    <PlayIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <h3 className="text-xs font-semibold">{d.title}</h3>
                </div>
                <div className="absolute top-0 left-0 right-0 p-2">
                  <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
                    {d.episode}
                  </h3>
                </div>
              </Link>
            </AspectRatio>
          </Card>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Link href={"/ongoing"}>
          <span className={buttonVariants({ variant: "ghost" })}>
            Lihat Semua
          </span>
        </Link>
      </div>
    </div>
  );
};

const Finished = async () => {
  const finis = await getFinishedAnime();
  if (finis?.message) {
    return (
      <div className="text-center">
        <p>{finis.message}</p>
      </div>
    );
  }
  if (finis?.data.length === 0) {
    return (
      <div className="text-center">
        <p>Anime tidak ditemukan</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {finis?.data.map((d: RecentType) => (
          <Card
            key={d.animeId}
            className="group border rounded-md overflow-hidden"
          >
            <AspectRatio ratio={3 / 4} className="bg-muted relative">
              <Link
                href={`/details${d.animeId.replace('https://kuramanime.vip', '')}`}
                className="absolute inset-0 w-full group-focus:outline"
              >
                <Image
                  src={d.image}
                  alt={d.title}
                  height={640}
                  width={480}
                  className="w-full h-full object-cover"
                />
                <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 h-2/4 group-hover:h-full transition-all bg-gradient-to-t from-zinc-100 to-zinc-100/0 dark:from-zinc-900 dark:to-zinc-900/0">
                  <div className="opacity-0 p-2 group-hover:opacity-100 rounded-full bg-green-600 hover:bg-green-700">
                    <PlayIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <h3 className="text-xs font-semibold">{d.title}</h3>
                </div>
                <div className="absolute top-0 left-0 right-0 p-2">
                  <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
                    {d.episode}
                  </h3>
                </div>
              </Link>
            </AspectRatio>
          </Card>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Link href={"/finished"}>
          <span className={buttonVariants({ variant: "ghost" })}>
            Lihat Semua
          </span>
        </Link>
      </div>
    </div>
  );
};
