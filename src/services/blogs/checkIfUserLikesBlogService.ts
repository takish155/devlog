import { prisma } from "@/../prisma/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function checkIfUserLikesBlogService(
  blogId: string,
  userId?: string
) {
  "use cache";

  cacheLife("max");
  cacheTag(`/blogs/${blogId}/likes/${userId ?? "anonymous"}`);

  if (!userId) return false;

  const data = await prisma.blogLike.findFirst({
    where: {
      blogId,
      userId,
    },
  });

  if (!data) return false;

  return true;
}

export async function revalidateIfUserLike(blogId: string, userId: string) {
  cacheTag(`/blogs/${blogId}/likes/${userId}`);
}
