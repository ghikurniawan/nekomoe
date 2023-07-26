import { buttonVariants } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  ReactPortal,
} from "react";

const getAllProperties = async () => {
  const properties = await fetch(`${getBaseUrl()}/api/properties`);
  const json = await properties.json();
  return json;
};

export default async function PropertiesPage() {
  const properties = await getAllProperties();
  if (properties?.message) {
    return (
      <div>
        <p>{properties?.message}</p>
      </div>
    );
  }
  return (
    <div className="pb-20 space-y-4 text-center">
      <h1>Genre</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
        {properties?.data.map(
          (item: {
            genreId: Key | null | undefined;
            genreName:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | PromiseLikeOfReactNode
              | null
              | undefined;
          }) => (
            <li key={item.genreId}>
              <Link href={`/properties/genre/${item.genreId}`}>
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
}
