import { prisma } from "@/../prisma/prisma";

export default async function commentBlogService(
  blogId: string,
  userId: string,
  content: string,
  parentCommentId?: string
) {
  if (!parentCommentId) {
    const [blog, blogComment] = await Promise.all([
      prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      }),
      prisma.blogComment.create({
        data: {
          blog: {
            connect: {
              id: blogId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          content,
        },
      }),
    ]);

    return { blog, blogComment };
  }

  const [blog, blogComment, blogCommentParent] = await Promise.all([
    prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    }),
    prisma.blogComment.create({
      data: {
        blog: {
          connect: {
            id: blogId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        parent: {
          connect: {
            id: parentCommentId,
          },
        },
        content,
      },
    }),
    prisma.blogComment.update({
      where: {
        id: parentCommentId,
      },
      data: {
        childCount: {
          increment: 1,
        },
      },
    }),
  ]);

  return { blog, blogComment, blogCommentParent };
}
