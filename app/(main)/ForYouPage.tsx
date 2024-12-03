"use client";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { PostDataType } from "@/lib/types";
import { Loader2 } from "lucide-react";
import PostComponent from "./PostComponent";

const ForYouPage = () => {
  const query = useQuery<PostDataType[]>({
    queryKey: ["for-you", "post-feed"],
    queryFn: async () => {
      const res = await axios.get("/api/post/for-you");
      return res.data;
    },
  });

  if (query.isFetching) {
    return <Loader2 className="animate-spin mx-auto " />;
  }

  if (query.error) {
    return <p className="text-destructive font-bold">An error occured</p>;
  }

  return (
    <>
      {query.data?.map((post) => {
        return <PostComponent key={post.id} post={post} />;
      })}
    </>
  );
};

export default ForYouPage;
