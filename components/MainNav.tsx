import Link from "next/link";
import {
  BarChartIcon,
  CalendarIcon,
  HomeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MixIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons";

const date = new Date();
const year = date.getFullYear();

const navItems = [
  {
    id: "1",
    title: "On Going",
    href: "/ongoing",
    icons: <RocketIcon className="h-5 w-5 mr-4" />,
  },
  {
    id: "2",
    title: "Finished",
    href: "/finished",
    icons: <LightningBoltIcon className="h-5 w-5 mr-4" />,
  },
  {
    id: "3",
    title: "Summer " + year,
    href: `/properties/season/summer-${year}?page=1`,
    icons: <SunIcon className="h-5 w-5 mr-4" />,
  },
  {
    id: "4",
    title: "Schedule",
    href: "/schedule",
    icons: <CalendarIcon className="h-5 w-5 mr-4" />,
  },
  {
    id: "3",
    title: "Properties",
    href: "/properties",
    icons: <MixIcon className="h-5 w-5 mr-4" />,
  },
];

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
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="w-full flex justify-start items-center h-6 text-muted-foreground hover:text-foreground"
            >
              {item.icons}
              <span className="text-xl">{item.title}</span>
            </Link>
          ))}
        </div>
        <div>
          <Link
            href={"/analytics"}
            prefetch={false}
            target="_blank"
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
