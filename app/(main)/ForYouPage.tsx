"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";
import { PostDataType, PostDataTypeWithCursor } from "@/lib/types";
import { Loader2 } from "lucide-react";
import PostComponent from "./PostComponent";
import { Button } from "@/components/ui/button";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";

const ForYouPage = () => {
  const query = useInfiniteQuery<PostDataTypeWithCursor>({
    queryKey: ["for-you", "post-feed"],
    queryFn: async ({ pageParam }) => {
      const cursorParam = pageParam ? `?cursor=${pageParam}` : "";
      const res = await axios.get(`/api/post/for-you${cursorParam}`);
      return res.data satisfies PostDataTypeWithCursor;
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // if we put query.fetching it will show the loader even if we click on show next page as its oviously fetching
  if (query.status === "loading") {
    return <Loader2 className="animate-spin mx-auto " />;
  }

  if (query.error) {
    return <p className="text-destructive font-bold">An error occured</p>;
  }
  const posts = query.data?.pages.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => {
        query.hasNextPage && !query.isFetching && query.fetchNextPage();
      }}
    >
      {posts?.map((post) => {
        return <PostComponent key={post.id} post={post} />;
      })}
      {query.isFetchingNextPage && <Loader2 className="animate-spin mx-auto" />}
    </InfiniteScrollContainer>
  );
};

export default ForYouPage;
