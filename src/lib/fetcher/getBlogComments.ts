import { Session } from "next-auth";
import { prisma } from "@/../prisma/prisma";

export default async function getBlogComments({
  blogId,
  orderBy,
  session,
  cursor,
}: {
  blogId: string;
  orderBy?: string | null;
  session?: Session | null;
  cursor?: string | null;
}) {
  switch (orderBy) {
    case "likes": {
      if (cursor) {
        const comments = await prisma.blogComment.findMany({
          where: {
            blogId,
            parentId: null,
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
          blogId,
          parentId: null,
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

      return comments;
    }

    case "newest": {
      if (cursor) {
        const comments = await prisma.blogComment.findMany({
          where: {
            blogId,
            parentId: null,
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
            createdAt: "desc",
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
          blogId,
          parentId: null,
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
          createdAt: "desc",
        },
        take: 10,
      });

      return comments;
    }

    default: {
      if (cursor) {
        const comments = await prisma.blogComment.findMany({
          where: {
            blogId,
            parentId: null,
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
            likeCount: "asc",
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
          blogId,
          parentId: null,
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
          likeCount: "asc",
        },
        take: 10,
      });

      return comments;
    }
  }
}
