import SectionComponent from "@/components/Section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Card } from "@/components/ui/card";
// import { getBaseUrl } from "@/lib/getBaseUrl";
// import { PlayIcon } from "@radix-ui/react-icons";
// import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <SectionComponent>
      <div className="space-y-4 py-4 mb-4">
        <div className="max-h-[50vh] rounded-md overflow-hidden h-full w-full mx-auto">
          <AspectRatio ratio={21 / 9}>
            <div className="w-full h-full shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-zinc-800 before:via-zinc-300 before:to-transparent"></div>
          </AspectRatio>
        </div>

        <div className="flex justify-between">
          <h3 className="font-semibold ">On Going</h3>
          <Link
            href={"/ongoing"}
            className="text-muted-foreground hover:text-foreground"
          >
            Show all
          </Link>
        </div>
        <Suspense fallback={"loading"}>{/* <OnGoing /> */}</Suspense>

        <div className="flex justify-between">
          <h3 className="font-semibold ">Popular</h3>
          <Link
            href={"/"}
            className="text-muted-foreground hover:text-foreground"
          >
            Show all
          </Link>
        </div>
      </div>
    </SectionComponent>
  );
}

// const getOngoingAnime = async () => {
//   const populars = await fetch(`${getBaseUrl()}/api/ongoing`, {
//     headers: { "content-type": "aplication/json" },
//   });
//   const json = populars?.json();
//   return json;
// };

// type RecentType = {
//   title: string;
//   animeId: string;
//   image: string;
//   episode: string;
// };

// const OnGoing = async () => {
//   const onGoing = await getOngoingAnime();
//   if (onGoing?.message) {
//     return (
//       <div className="text-center">
//         <p>{onGoing.message}</p>
//       </div>
//     );
//   }
//   if (onGoing?.data.length === 0) {
//     return (
//       <div className="text-center">
//         <p>Anime tidak ditemukan</p>
//       </div>
//     );
//   }
//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
//         {onGoing?.data.map((d: RecentType) => (
//           <Card
//             key={d.animeId}
//             className="group border rounded-md overflow-hidden"
//           >
//             <AspectRatio ratio={3 / 4} className="bg-muted relative">
//               <Link
//                 href={`/watch${d.animeId}`}
//                 className="absolute inset-0 w-full group-focus:outline"
//               >
//                 <Image
//                   src={d.image}
//                   alt={d.title}
//                   height={640}
//                   width={480}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 h-2/4 group-hover:h-full transition-all bg-gradient-to-t from-zinc-100 to-zinc-100/0 dark:from-zinc-900 dark:to-zinc-900/0">
//                   <div className="opacity-0 p-2 group-hover:opacity-100 rounded-full bg-green-600 hover:bg-green-700">
//                     <PlayIcon className="h-5 w-5" />
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 p-2">
//                   <h3 className="text-xs font-semibold">{d.title}</h3>
//                 </div>
//                 <div className="absolute top-0 left-0 right-0 p-2">
//                   <h3 className="text-xs bg-background rounded-full p-1 inline-block px-2">
//                     {d.episode}
//                   </h3>
//                 </div>
//               </Link>
//             </AspectRatio>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };
