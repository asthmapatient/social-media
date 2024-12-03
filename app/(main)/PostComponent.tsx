import UserAvatar from "@/components/ui/UserAvatar";
import { PostDataType } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { Post } from "@prisma/client";
import React from "react";
import { json } from "stream/consumers";

interface PostProps {
  post: PostDataType;
}

const PostComponent = ({ post }: PostProps) => {
  return (
    <article className="bg-primary-foreground space-y-5 p-5 rounded-xl  shadow-xl">
      <div className="flex gap-4 items-center">
        <UserAvatar avatarUrl={post.user.avatarUrl} />
        <div className="flex flex-col">
          <h3 className="font-bold ">{post.user.displayName}</h3>
          <h4 className="text-muted-foreground text-sm">
            {formatRelativeTime(post.createdAt)}
          </h4>
        </div>
      </div>
      <div className=" break-words whitespace-pre-line">{post.content}</div>
    </article>
  );
};

export default PostComponent;
