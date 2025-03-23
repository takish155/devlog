import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { prisma } from "@/../prisma/prisma";
import { revalidateTag } from "next/cache";

export default async function getCommentCountService(blogId: string) {
  "use cache";

  cacheTag(`/blogs/${blogId}/comments/count`);
  cacheLife("max");

  const data = await prisma.blogComment.count({
    where: {
      blogId,
    },
  });

  return data;
}

export async function revalidateCommentCount(blogId: string) {
  revalidateTag(`/blogs/${blogId}/comments/count`);
}
