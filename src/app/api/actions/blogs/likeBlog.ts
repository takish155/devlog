"use server";

import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";

export default async function likeBlog(blogId: string) {
  try {
    const translation = getTranslations("BlogPage.server");
    const sessionRequest = auth();

    const [t, session] = await Promise.all([translation, sessionRequest]);

    if (!session)
      return {
        success: false,
        message: t("errors.notAuthenticated"),
        status: 401,
      };

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      return {
        success: false,
        message: t("errors.notFound"),
        status: 404,
      };
    }
    const blogLike = await prisma.blogLike.findFirst({
      where: {
        blogId,
        userId: session.user?.id,
      },
    });

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
