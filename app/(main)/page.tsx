import PostEditor from "@/components/Editor/PostEditor";
import prisma from "@/lib/prisma";
import PostComponent from "./PostComponent";
import { postDataInclude } from "@/lib/types";
import RightSidebar from "./RightSidebar";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="w-full flex gap-5">
      <div className=" w-full  bg-card px-3 py-5 lg:px-4 shadow-sm rounded-2xl flex flex-col gap-5">
        <PostEditor />
        {posts.map((post) => {
          return <PostComponent key={post.id} post={post} />;
        })}
      </div>
      <RightSidebar />
    </main>
  );
}
