import { buttonVariants } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Key, FC } from "react";

interface GenrePageProps {
  params: { category: string };
}
const getAllCategory = async (category: string) => {
  const properties = await fetch(`${getBaseUrl()}/api/properties/${category}`);
  const json = await properties.json();
  return json;
};
const GenrePage: FC<GenrePageProps> = async ({ params }) => {
  const { category } = params;
  const allCategory = await getAllCategory(category);
  if (allCategory?.message) {
    return (
      <div>
        <p>{allCategory?.message}</p>
      </div>
    );
  }
  return (
    <div className="pb-20 space-y-4 text-center px-4">
      <h1 className="capitalize">{category}</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allCategory?.data.map(
          (
            item: { genreId: Key | null | undefined; genreName: string },
            index: Key | null | undefined
          ) => (
            <li key={index}>
              <Link href={`/properties/${category}/${item.genreId}`}>
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full bg-background"
                  )}
                >
                  {item.genreName}
                </span>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GenrePage;
