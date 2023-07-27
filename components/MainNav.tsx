import Link from "next/link";
import {
  BarChartIcon,
  HomeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MixIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

const MainNav = () => {
  return (
    <aside className="z-10 p-1 flex flex-col gap-y-2 lg:hover:border-r border-zinc-700 h-full">
      <div className="bg-zinc-100 font-semibold dark:bg-zinc-900 rounded-md h-fit w-full p-4 space-y-4">
        <Link
          href={"/"}
          className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
        >
          <HomeIcon className="h-5 w-5 mr-4 " />
          <span className="text-xl">Home</span>
        </Link>
        <Link
          href={"/search"}
          className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
        >
          <MagnifyingGlassIcon className="h-5 w-5 mr-4 " />
          <span className="text-xl">Search</span>
        </Link>
      </div>
      <div className="bg-zinc-100 font-semibold dark:bg-zinc-900 rounded-md h-full p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <Link
            href={"/ongoing"}
            className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
          >
            <RocketIcon className="h-5 w-5 mr-4 " />
            <span className="text-xl">On Going</span>
          </Link>
          <Link
            href={"/finished"}
            className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
          >
            <LightningBoltIcon className="h-5 w-5 mr-4 " />
            <span className="text-xl">Finished</span>
          </Link>
          <Link
            href={"/properties"}
            className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
          >
            <MixIcon className="h-5 w-5 mr-4 " />
            <span className="text-xl">Properties</span>
          </Link>
        </div>
        <div>
          <Link
            href={"/analytics"}
            className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
          >
            <BarChartIcon className="h-5 w-5 mr-4" />
            <span className="text-xl">Analytics</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default MainNav;
