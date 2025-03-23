import { prisma } from "@/../prisma/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function getStaffPickedBlogs() {
  "use cache";

  cacheLife("max");
  cacheTag("staff-picked-blogs");

  const selectQuery = {
    id: true,
    title: true,
    description: true,
    thumbnail: true,
    createdAt: true,
    likeCount: true,
    commentCount: true,
    author: {
      select: {
        username: true,
        displayName: true,
        image: true,
      },
    },
  };

  const staffPickedBlogs = await prisma.staffPick.findMany({
    select: {
      blog: {
        select: selectQuery,
      },
    },
  });

  return staffPickedBlogs;
}

export type StaffPickedBlog = Awaited<ReturnType<typeof getStaffPickedBlogs>>;
