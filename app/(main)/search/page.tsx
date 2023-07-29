import { FC, Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface SearchPageProps {
  params: string;
  searchParams: { query: string };
}

const SearchPage: FC<SearchPageProps> = ({ searchParams }) => {
  const { query } = searchParams;
  if (!query) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p>Ketikan kata dalam kotak pencarian</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-zinc-800 px-4 z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        <Suspense fallback={"Searching...."}>
          <SearchResult query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;

const getSearch = async (query: string) => {
  const res = await fetch(`${getBaseUrl()}/api/search?query=${query}`);
  const json = await res.json();
  return json;
};

const SearchResult: FC<{ query: string }> = async ({ query }) => {
  const result = await getSearch(query);
  if (result?.message) {
    return (
      <div className="text-center w-full col-span-6">
        <p>{result.message}</p>
      </div>
    );
  }
  if (result?.data.length === 0) {
    return (
      <div className="text-center w-full col-span-6">
        <p>Hasil tidak ditemukan</p>
      </div>
    );
  }
  return result?.data.map((d: any) => (
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
        </Link>
      </AspectRatio>
    </Card>
  ));
};
