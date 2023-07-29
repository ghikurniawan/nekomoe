import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";

const UMAMI_TOKEN = process.env.UMAMI_TOKEN;

const Footer = () => {
  return (
    <footer className="h-[10vh] p-1">
      <div className=" grid grid-cols-5 w-full px-4">
        <div className=" col-span-1"></div>
        <div className="col-span-3 flex flex-col items-center justify-center">
          <Link href={"/"}>
            <Logo className="w-10 h-10 mx-auto" />
            <div className="font-bold text-xl text-foreground/50">
              Neko<span className="text-green-400">moe</span>
            </div>
          </Link>
        </div>
        <div className=" col-span-1 flex items-center justify-end">
          {UMAMI_TOKEN && (
            <Link href={"/analytics"} target="_blank">
              <Button variant={"outline"} className="rounded-full">
                <Suspense fallback={"Loading..."}>
                  <ActiveViews />
                </Suspense>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const ActiveViews = async () => {
  const response = await fetch(
    "https://iwwwan-umami.vercel.app/api/websites/5af5b555-c821-4ec0-876c-1a5e0174df18/active",
    {
      headers: {
        Authorization: `Bearer ${UMAMI_TOKEN}`,
        cache: "no-store",
      },
    }
  );

  const active: { x: string }[] = await response.json();

  return (
    <>
      {active?.map((n) => n.x)} <EyeOpenIcon className="ml-2" />
    </>
  );
};
