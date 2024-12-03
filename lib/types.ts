import { Prisma } from "@prisma/client";
export const UserDataSelect = {
  username: true,
  displayName: true,
  avatarUrl: true,
  id: true,
} satisfies Prisma.UserSelect; //this is for user slect and down is for user include

export const postDataInclude = {
  user: {
    select: UserDataSelect,
  },
} satisfies Prisma.PostInclude; // we do this because we need the type in  <PostComponent/> as there wont be user type during fetching

export type PostDataType = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;  // to get include type in Posts includding users
