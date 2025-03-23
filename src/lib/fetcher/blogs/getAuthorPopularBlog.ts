import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { prisma } from "@/../prisma/prisma";

export default async function getAuthorPopularBlog(
  authorId: string,
  blogId: string
) {
  "use cache";

  cacheTag(
    `author-${authorId}`,
    `/blogs/author/${authorId}/popular?skip=${blogId}`
  );
  cacheLife("days");

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

  const data = await prisma.blog.findMany({
    where: {
      authorId,
      NOT: {
        id: blogId,
      },
    },
    take: 3,
    orderBy: {
      likeCount: "desc",
    },
    select: selectQuery,
  });

  return data;
}
