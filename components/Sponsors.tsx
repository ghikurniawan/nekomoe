const Sponsors = () => {
  return (
    <div className="w-full h-full relative flex flex-col gap-6 justify-center items-center">
      <h1 className="text-4xl md:text-7xl font-black text-muted-foreground">
        Neko<span className="text-green-600">moe</span>
      </h1>
      <p className="lg:text-xl text-muted-foreground">
        Nonton anime subtitle Indonesia Gratis tanpa Iklan!
      </p>
      <div className="absolute text-sm top-4 right-4 border py-1 px-6 rounded-full bg-background/50">
        Sponsors
      </div>
    </div>
  );
};

export default Sponsors;
