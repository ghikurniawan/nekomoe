import Player from "@/components/Player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { DoubleArrowRightIcon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Key, Suspense } from "react";

const getWatchAnime = async (
  animeId: string,
  episode?: string,
  stream_server: string = "archive",
  page: string | number = 1
) => {
  const watch = await fetch(
    `${getBaseUrl()}/api/watch/${animeId}/${episode}?stream_server=${stream_server}&page=${page}`,
    {
      headers: { "content-type": "aplication/json" },
      next: { revalidate: 60 },
    }
  );
  const json = watch.json();
  return json;
};

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: { anime: string[] };
  searchParams: { stream_server: string; page: string | number };
}) {
  const animeId = `${params.anime[0]}/${params.anime[1]}/${params.anime[2]}`;
  console.log("anime id" , animeId)
  const { stream_server, page } = searchParams;
  let episode = `${params.anime[3]}/${params.anime[4]}` as string | undefined;
  if (episode == "undefined/undefined") {
    episode = undefined;
  }

  const watch = await getWatchAnime(animeId, episode, stream_server, page);
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
        <p>Anime Tidak Ditemukan {`${getBaseUrl()}/watch/${animeId}`}</p>
      </div>
    );
  }
  const { episodeUrl, data } = watch;
  return (
    <div className="space-y-4 py-4 mb-10 px-4">
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
        className="w-full md:w-1/2 h-[40vh] lg:h-[20vh] border rounded-lg"
      >
        {data?.map(
          (
            item: { episodeText: string; episodeId: string },
            i: Key | null | undefined
          ) => (
            <div
              key={i}
              className="w-full px-4 py-1 group border flex justify-between items-center"
            >
              <p className="py-3">{item.episodeText || "Next Page"}</p>
              <Link
                href={`/watch${item?.episodeId}?${
                  stream_server ? "stream_server=" + stream_server : ""
                }${page ? "&page=" + page : ""}`}
                prefetch={false}
              >
                <Button size={"icon"} className="md:hidden group-hover:flex">
                  {item.episodeText ? <PlayIcon /> : <DoubleArrowRightIcon />}
                </Button>
              </Link>
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}
