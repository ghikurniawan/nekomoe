"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (value !== "") {
      router.push(`/search?query=${value}`);
    }
  };

  return (
    <div className="relative py-10 w-full max-w-screen-md mx-auto px-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && handleSearchSubmit()}
        placeholder="Search..."
        className="h-10 rounded-full focus-visible:ring-0"
      />
      <div className="absolute w-9 top-0 right-4 h-full flex justify-center items-center">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={handleSearchSubmit}
          className="rounded-full"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
