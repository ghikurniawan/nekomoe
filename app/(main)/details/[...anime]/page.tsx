import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC, Suspense } from "react";
import { getDelay } from "@/lib/getDelay";

const getDetailsAnime = async (animeId: string) => {
  const populars = await fetch(`${getBaseUrl()}/api/details/${animeId}`, {
    headers: { "content-type": "aplication/json" },
    next: { revalidate: 60 },
  });
  const json = populars.json();
  return json;
};

export default async function AnimePage({
  params,
}: {
  params: { anime: string[] };
}) {
  const animeId = `${params.anime[0]}/${params.anime[1]}/${params.anime[2]}`;
  const detailAnime = await getDetailsAnime(animeId);
  if (detailAnime?.message) {
    return (
      <div className="text-center">
        <p>{detailAnime.message}</p>
      </div>
    );
  }

  const { episode, title, image } = detailAnime.data[0];
  return (
    <div className="space-y-4 py-4 mb-4 px-4 pb-10">
      <div className="max-h-[80vh] rounded-md overflow-hidden h-full w-full mx-auto">
        <AspectRatio ratio={16 / 9}>
          <Suspense
            fallback={
              <div className="w-full h-full shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
            }
          >
            <ExoticBannerImage image={image} title={title} />
          </Suspense>
        </AspectRatio>
      </div>

      <h3 className="font-semibold text-xl">{title}</h3>

      <div className="w-full">
        <div className="grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          {episode?.map((d: any) => (
            <Card
              key={d.epsTitle}
              className="group col-span-1 border rounded-md overflow-hidden"
            >
              <AspectRatio ratio={3 / 4} className="bg-muted relative">
                <Link
                  href={`/watch${d.episodeId.replace('https://kuramanime.vip', '')}`}
                  className="absolute inset-0 w-full group-focus:outline"
                >
                  <Image
                    src={image}
                    alt={title}
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
                    <h3 className="text-xs font-semibold">{d.epsTitle}</h3>
                  </div>
                </Link>
              </AspectRatio>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const ExoticBannerImage: FC<{ image: string; title: string }> = async ({
  image,
  title,
}) => {
  const delay = await getDelay(1500);
  return (
    delay && (
      <Image
        src={image}
        alt={title}
        width={1080}
        height={720}
        className="w-full h-full object-cover"
      />
    )
  );
};
