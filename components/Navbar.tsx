import Link from "next/link";
import React from "react";
import UserButton from "./ui/UserButton";
import SearchField from "./SearchField";
import ThemeSelector from "./ui/ThemeSelector";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center px-5 py-3">
        <Link href={"/"} className="text-2xl font-bold text-primary">
          social-media
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
        <ThemeSelector />
      </div>
    </header>
  );
};

export default Navbar;
