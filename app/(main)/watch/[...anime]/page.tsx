import Player from "@/components/Player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Key, Suspense } from "react";

const getWatchAnime = async (animeId: string, episode = "episode/1") => {
  const populars = await fetch(
    `${getBaseUrl()}/api/watch/${animeId}/${episode}`,
    {
      headers: { "content-type": "aplication/json" },
      cache: "no-store",
    }
  );
  const json = populars.json();
  return json;
};

export default async function WatchPage({
  params,
}: {
  params: { anime: string[] };
}) {
  const animeId = `${params.anime[0]}/${params.anime[1]}/${params.anime[2]}`;
  let episode = `${params.anime[3]}/${params.anime[4]}` as string | undefined;
  if (episode == "undefined/undefined") {
    episode = undefined;
  }
  const watch = await getWatchAnime(animeId, episode);
  if (watch?.message) {
    return (
      <div>
        <p>{watch.message}</p>
      </div>
    );
  }
  if (watch?.data.length === 0) {
    return (
      <div className="text-center">
        <p>Anime Tidak Ditemukan {`${getBaseUrl()}/${animeId}`}</p>
      </div>
    );
  }
  const { episodeUrl, data } = watch;

  return (
    <div className="space-y-4 py-4 mb-10">
      <div className=" max-h-[80vh] rounded-md overflow-hidden h-full w-full mx-auto">
        <AspectRatio ratio={16 / 9}>
          <Suspense
            fallback={
              <div className="w-full h-full shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
            }
          >
            <Player source={episodeUrl} />
          </Suspense>
        </AspectRatio>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-xl">
            Ep.{watch?.episode || "---"}
          </h3>
        </div>
      </div>
      <ScrollArea
        type="hover"
        scrollHideDelay={600}
        className="w-full max-w-xs h-[20vh] p-4 border rounded-lg"
      >
        {data?.map(
          (item: { episodeText: string }, i: Key | null | undefined) => (
            <div key={i} className="w-full p-2 border bg-background">
              {item.episodeText}
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}
