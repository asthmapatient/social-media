import { Button } from "@/components/ui/button";
import { BellIcon, Bookmark, HomeIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SideBarProps {
  className: string;
}

const SideBar = ({ className }: SideBarProps) => {
  return (
    <aside className={className}>
      {/* // asChild will make it so that it looks like a button but it wont be but functionality of inside */}
      <Button variant={"ghost"} asChild className="justify-start">
        <Link href={"/"}>
          <HomeIcon />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button variant={"ghost"} asChild className="justify-start">
        <Link href={"/notifications"}>
          <BellIcon />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
      <Button variant={"ghost"} asChild className="justify-start">
        <Link href={"/messages"}>
          <MailIcon />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
      <Button variant={"ghost"} asChild className="justify-start">
        <Link href={"/bookmarks"}>
          <Bookmark />
          <span className="hidden lg:inline">BookMarks</span>
        </Link>
      </Button>
    </aside>
  );
};

export default SideBar;
