import { FC, Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFinishedAnime } from "@/lib/getFinishedAnime";

type RecentType = {
  title: string;
  animeId: string;
  image: string;
  episode: string;
};

interface FinishedPageProps {
  searchParams: {
    page: string;
  };
}

const FinishedPage: FC<FinishedPageProps> = async ({ searchParams }) => {
  const { page = 1 } = searchParams;
  return (
    <div className="w-full space-y-6 mb-10 px-4">
      <h1 className="font-bold text-2xl">Finished</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        <Suspense fallback={<GridFallback />}>
          <ExoticFinished page={page} />
        </Suspense>
      </div>
      <div className="mx-auto w-full flex gap-2 justify-center">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Link
            href={`/finished?page=${item}`}
            key={item}
            className={`${
              item.toString() === page
                ? "pointer-events-none cursor-default"
                : ""
            }`}
          >
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                item.toString() === page ? "bg-muted" : "bg-background"
              )}
            >
              {item}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FinishedPage;

const ExoticFinished: FC<{ page: string | number }> = async ({ page }) => {
  const finished = await getFinishedAnime(page);
  return finished?.data.map((d: RecentType) => (
    <Card key={d.animeId} className="group border rounded-md overflow-hidden">
      <AspectRatio ratio={3 / 4} className="bg-muted relative">
        <Link
          href={`/details${d.animeId}`}
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
  ));
};

const GridFallback = () => {
  return Array.from({ length: 18 }, (_, index) => index + 1).map((l) => (
    <Card key={l} className="border rounded-md overflow-hidden">
      <AspectRatio ratio={3 / 4}>
        <div className="w-full h-full before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
      </AspectRatio>
    </Card>
  ));
};
