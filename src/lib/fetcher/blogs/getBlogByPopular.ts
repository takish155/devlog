import { prisma } from "@/../prisma/prisma";
import { BlogBody } from "./getBlogs";

export default async function getBlogByPopular(body: BlogBody) {
  const whereQuery = body.query
    ? {
        authorId: body.authorId ?? undefined,
        OR: [
          {
            title: {
              contains: body.query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: body.query,
              mode: "insensitive",
            },
          },
        ],
      }
    : { authorId: body.authorId ?? undefined };

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

  if (!body.cursor) {
    const blogs = await prisma.blog.findMany({
      where: whereQuery as any,
      take: 10,
      orderBy: {
        likeCount: "desc",
      },
      select: selectQuery,
    });

    return blogs;
  }

  const blogs = await prisma.blog.findMany({
    where: whereQuery as any,
    take: 10,
    skip: 1,
    cursor: {
      id: body.cursor,
    },
    orderBy: {
      likeCount: "desc",
    },
    select: selectQuery,
  });

  return blogs;
}
