import { prisma } from "@/../prisma/prisma";
import { Session } from "next-auth";

export default async function getBlogCommentChildren({
  parentId,
  session,
  cursor,
}: {
  parentId: string;
  session?: Session | null;
  cursor?: string | null;
}) {
  if (cursor) {
    const comments = await prisma.blogComment.findMany({
      where: {
        parentId,
      },
      select: {
        id: true,
        likeCount: true,
        content: true,
        createdAt: true,
        childCount: true,
        likes: {
          where: {
            userId: session?.user?.id ?? undefined,
          },
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
      orderBy: {
        likeCount: "desc",
      },
      take: 10,
      cursor: {
        id: cursor,
      },
    });

    return comments;
  }

  const comments = await prisma.blogComment.findMany({
    where: {
      parentId,
    },
    select: {
      id: true,
      likeCount: true,
      content: true,
      createdAt: true,
      childCount: true,
      likes: {
        where: {
          userId: session?.user?.id ?? undefined,
        },
        select: {
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          image: true,
        },
      },
    },
    orderBy: {
      likeCount: "desc",
    },
    take: 10,
  });

  console.log(parentId);

  console.log(comments);

  return comments;
}
