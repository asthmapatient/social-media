import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/UserAvatar";
import prisma from "@/lib/prisma";
import { UserDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React, { Suspense } from "react";

const RightSidebar = () => {
  return (
    <aside className="sticky top-[5.1rem] hidden md:block lg:w-72 w-64 h-fit flex-none space-y-5 ">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopic />
      </Suspense>
    </aside>
  );
};

export default RightSidebar;

async function WhoToFollow() {
  //we dont do this in the main thing because its rendering in the main page but if there is delay i want to show the main page just delay this page and suspense only works in child component
  const { user } = await validateRequest();
  if (!user) return null;

  const usersToFollow = prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: UserDataSelect,
    take: 5,
  });

  return (
    <div className="bg-card rounded-2xl  px-3 py-5 lg:px-4 shadow-sm">
      <div className="text-xl font-bold">Who to Follow</div>
      {(await usersToFollow).map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center gap-3 mt-6 justify-between"
          >
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="" />
              <div className="">
                <h3 className="font-bold  line-clamp-1  hover:underline">
                  {user.displayName}
                </h3>
                <h4 className="text-muted-foreground text-sm line-clamp-1">
                  @{user.username}
                </h4>
              </div>
            </Link>
            <Button className="">Follow</Button>
          </div>
        );
      })}
    </div>
  );
}

const getTrendingTopic = unstable_cache(
  // cache between different users and different requests only works in production/dev
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
      SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
      FROM posts
      GROUP BY hashtag
      ORDER BY count DESC, hashtag ASC
      LIMIT 5
    `;
    // console.log("result", result);
    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count), // since it's a bigint we have to convert to int
    }));
  },
  ["trending_topics"],
  {
    revalidate: 5, // 3 hours
  }
);

async function TrendingTopic() {
  //we will count #... in the post using postgress.. but its a heavy expression and we have to do it for every user since session is dynamic so we use unstable cache to do it once and it will be cached on server so different user wont keep hitting request since its same for all users

  const trendingTopics = await getTrendingTopic();

  return (
    <div className="bg-card rounded-2xl flex flex-col gap-4 px-3 py-5 lg:px-4 shadow-sm">
      <h2 className="font-bold text-xl ">Trending Topics</h2>

      {trendingTopics.map((t1) => {
        const title = t1.hashtag.split("#")[1];
        return (
          <Link key={title} href={`/hashtag/${title}`} className="">
            <h2 className="font-bold hover:underline  line-clamp-1">
              {t1.hashtag}
            </h2>
            <span className="text-sm text-muted-foreground">
              {formatCount(t1.count)} {t1.count == 1 ? "post" : "posts"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return count.toString();
}
