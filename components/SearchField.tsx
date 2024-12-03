"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10"/>
        <SearchIcon className="absolute right-4 size-4 top-1/2  -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
