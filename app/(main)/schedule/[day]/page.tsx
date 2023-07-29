import { getBaseUrl } from "@/lib/getBaseUrl";
import { FC, Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function ScheduledDaysPage({
  params,
}: {
  params: { day: string };
}) {
  return (
    <div className="pb-20 space-y-4 text-center px-4">
      <div className="w-full space-y-6 mb-10">
        <h1 className="font-bold text-2xl capitalize">{params?.day}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Suspense fallback={<GridFallback />}>
            <ExoticSchedule day={params.day} />
          </Suspense>
        </div>
      </div>
    </div>
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

const getAllSchedule = async (day: string) => {
  const properties = await fetch(`${getBaseUrl()}/api/schedule/${day}`, {
    next: { revalidate: 60 },
  });
  const json = await properties?.json();
  return json;
};

const ExoticSchedule: FC<{ day: string }> = async ({ day }) => {
  const schedule = await getAllSchedule(day);
  if (schedule?.message) {
    return (
      <div>
        <p>{schedule?.message}</p>
      </div>
    );
  }

  return schedule?.data.map(
    (
      s: {
        animeId: any;
        image: string;
        title: string;
        episode: string | undefined;
        days: string;
        timeRelease: string;
      },
      i: null | undefined
    ) => (
      <Card
        key={i}
        className="group border rounded-md overflow-hidden bg-transparent"
      >
        <AspectRatio ratio={3 / 4} className="bg-muted relative">
          <Link
            href={`/details${s.animeId}`}
            className="absolute inset-0 w-full group-focus:outline"
          >
            <Image
              src={s.image}
              alt={s.title}
              height={640}
              width={480}
              className="w-full h-full object-cover"
            />
            <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 h-2/4 group-hover:h-full transition-all bg-gradient-to-t from-zinc-100 to-zinc-100/0 dark:from-zinc-900 dark:to-zinc-900/0">
              <div className="opacity-0 p-2 group-hover:opacity-100 rounded-full bg-green-600 hover:bg-green-700">
                <EyeOpenIcon className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
              <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
                {s.days}
              </h3>
              <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
                {s.episode}
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
                {s.timeRelease}
              </h3>
            </div>
          </Link>
        </AspectRatio>
        <div className="top-0 left-0 right-0 p-2">
          <h3 className="text-xs font-semibold">{s.title}</h3>
        </div>
      </Card>
    )
  );
};
