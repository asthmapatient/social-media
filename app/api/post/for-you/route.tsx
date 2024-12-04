import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostDataTypeWithCursor } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageLimit = 10;
    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageLimit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor = posts.length > pageLimit ? posts[pageLimit].id : null;
    const data: PostDataTypeWithCursor = {
      posts: posts.slice(0, pageLimit),
      nextCursor,
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
