import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { cn } from "@/lib/utils";
import { PlayIcon } from "@radix-ui/react-icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

import { FC, Key } from "react";

interface GenrePageProps {
  params: { category: string; id: string };
  searchParams: { page: string };
}
const getAllCategory = async (category: string, id: string, page: string) => {
  const properties = await fetch(
    `${getBaseUrl()}/api/properties/${category}/${id}?page=${page}`
  );
  const json = await properties.json();
  return json;
};
const GenrePage: FC<GenrePageProps> = async ({ params, searchParams }) => {
  const { category, id } = params;
  const { page } = searchParams;
  const allCategory = await getAllCategory(category, id, page);
  if (allCategory?.message) {
    return (
      <div>
        <p>{allCategory?.message}</p>
      </div>
    );
  }
  return (
    <div className="w-full space-y-4 px-4 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {allCategory?.data.map(
          (item: {
            animeId: Key | null | undefined;
            image: string | StaticImport;
            title: string;
          }) => (
            <Card
              key={item.animeId}
              className="group border rounded-md overflow-hidden"
            >
              <AspectRatio ratio={3 / 4} className="bg-muted relative">
                <Link
                  href={`/details${item.animeId}`}
                  className="absolute inset-0 w-full group-focus:outline"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
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
                    <h3 className="text-xs font-semibold">{item.title}</h3>
                  </div>
                </Link>
              </AspectRatio>
            </Card>
          )
        )}
      </div>
      <div className="mx-auto w-full flex gap-2 justify-center">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Link
            href={`/properties/${category}/${id}?page=${item}`}
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

export default GenrePage;
