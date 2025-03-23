import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { prisma } from "@/../prisma/prisma";
import { revalidateTag } from "next/cache";

export default class BlogLikeService {
  public static async getCount(blogId: string) {
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

  public static async revalidateCount(blogId: string) {
    revalidateTag(`/blogs/${blogId}/likes/count`);
  }

  public static async hasUserLiked(blogId: string, userId?: string) {
    "use cache";

    cacheLife("max");
    cacheTag(`/blogs/${blogId}/likes/${userId}`);

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

  public static async revalidateUserLike(blogId: string, userId: string) {
    revalidateTag(`/blogs/${blogId}/likes/${userId}`);
  }
}
