import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
interface UserAvatarProps {
  avatarUrl: string | null;
  size?: number;
  className?: string;
}
const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={avatarUrl || `https://github.com/shadcn.png`}
        
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
