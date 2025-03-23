import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { prisma } from "@/../prisma/prisma";
import { revalidateTag } from "next/cache";

export default async function getBlogLikeCountService(blogId: string) {
  "use cache";

  cacheTag(`/blogs/${blogId}/likes/count`);
  cacheLife("max");

  const data = await prisma.blogLike.count({
    where: {
      blogId,
    },
  });

  return data;
}

export async function revalidateBlogLikeCount(blogId: string) {
  revalidateTag(`/blogs/${blogId}/likes/count`);
}
