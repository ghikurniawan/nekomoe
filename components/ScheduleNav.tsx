import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Senin",
    value: "monday",
  },
  {
    title: "Selasa",
    value: "tuesday",
  },
  {
    title: "Rabu",
    value: "wednesday",
  },
  {
    title: "Kamis",
    value: "thursday",
  },
  {
    title: "Jum'at",
    value: "friday",
  },
  {
    title: "Sabtu",
    value: "saturday",
  },
  {
    title: "Minggu",
    value: "sunday",
  },
];

const ScheduleNav = () => {
  return (
    <ul className="grid grid-cols-4 md:grid-cols-8 gap-2">
      <li>
        <Link href={`/schedule`}>
          <span
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "w-full bg-background"
            )}
          >
            All
          </span>
        </Link>
      </li>
      {items.map((item) => (
        <li key={item.title}>
          <Link href={`/schedule/${item.value}`}>
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

export default ScheduleNav;
