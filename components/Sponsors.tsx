import Image from "next/image";

const Sponsors = async () => {
  return (
    <div className="w-full h-full relative">
      <Image src={"/assets/img/banner1.png"} fill alt="Banner neko moe" />
      <div className="absolute top-4 right-4 border py-1 px-6 rounded-full bg-background/50">
        Sponsors
      </div>
    </div>
  );
};

export default Sponsors;
