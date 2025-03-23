import { prisma } from "@/../prisma/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function getBlogById(blogId: string) {
  "use cache";

  cacheTag(`/blogs/${blogId}`);
  cacheLife("max");

  const data = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      thumbnail: true,
      author: {
        select: {
          displayName: true,
          image: true,
          username: true,
          id: true,
        },
      },
    },
  });

  return data;
}

export const revalidateBlog = (blogId: string) => {
  cacheTag(`/blogs/${blogId}`);
};

export type GetBlogByIdType = Awaited<ReturnType<typeof getBlogById>>;
export type HeaderBlogPageType = GetBlogByIdType;
