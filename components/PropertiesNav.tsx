import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const items = [
  { title: "Genre" },
  { title: "Season" },
  { title: "Studio" },
  { title: "Type" },
  { title: "Quality" },
  { title: "Source" },
  { title: "Country" },
];

const PropertiesNav = () => {
  return (
    <ul className="grid grid-cols-4 md:grid-cols-7 gap-2">
      {items.map((item) => (
        <li key={item.title}>
          <Link href={`/properties/${item.title.toLowerCase()}`}>
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full bg-background"
              )}
            >
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PropertiesNav;
