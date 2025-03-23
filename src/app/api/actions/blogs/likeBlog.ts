"use server";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import blogExistsMiddleware from "@/middlewares/blogs/blogExistsMiddleware";
import { Session } from "next-auth";
import { revalidateTag } from "next/cache";

export default async function likeBlog(blogId: string) {
  try {
    const translation = getTranslations("BlogPage.server");

    const { pass, message, passedData, status } = await handleMiddleware({
      middleware: [authMiddleware, blogExistsMiddleware],
      data: {
        blogId,
      },
    });

    if (!pass) {
      return {
        success: false,
        message: message,
        status: status,
      };
    }

    const session: Session = passedData![0];
    const blog = passedData![1];

    const blogRequest = prisma.blogLike.findFirst({
      where: {
        blogId,
        userId: session.user?.id,
      },
    });
    const [t, blogLike] = await Promise.all([translation, blogRequest]);

    // If the user liked the blog, unlike it
    if (blogLike) {
      await Promise.all([
        prisma.blogLike.delete({
          where: {
            id: blogLike.id,
          },
        }),
        prisma.blog.update({
          where: {
            id: blogId,
          },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        }),
      ]);

      revalidateTag(`/blogs/${blogId}/likes/count`);
      revalidateTag(`/blogs/${blogId}/likes/${session.user?.id}`);

      return {
        success: true,
        message: t("success.unliked"),
        data: {
          likeCount: blog.likeCount - 1,
          userLike: false,
        },
        status: 200,
      };
    }

    // If the user haven't liked the blog yet, like it
    await Promise.all([
      prisma.blogLike.create({
        data: {
          blog: {
            connect: {
              id: blogId,
            },
          },
          user: {
            connect: {
              id: session.user?.id,
            },
          },
        },
      }),
      prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      }),
    ]);

    revalidateTag(`/blogs/${blogId}/likes/count`);
    revalidateTag(`/blogs/${blogId}/likes/${session.user?.id}`);

    return {
      success: true,
      message: t("success.liked"),
      data: {
        likeCount: blog.likeCount + 1,
        userLike: true,
      },
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
}
