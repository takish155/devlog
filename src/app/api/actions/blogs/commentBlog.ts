"use server";

import {
  blogCommentSchema,
  BlogCommentType,
} from "@/schemas/blogComment.schema";
import { prisma } from "@/../prisma/prisma";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";

export default async function commentBlog(
  data: BlogCommentType,
  blogId: string,
  parentCommentId?: string
) {
  try {
    const sessionRequest = auth();
    const translation = getTranslations("BlogPage.comment.server");

    const [t, session] = await Promise.all([translation, sessionRequest]);

    if (!session) {
      return {
        success: false,
        message: t("errors.notAuthenticated"),
        status: 401,
      };
    }

    const isSafe = blogCommentSchema.safeParse(data);
    if (!isSafe.success) {
      return {
        success: false,
        message: t("errors.invalidRequestBody"),
        status: 400,
      };
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      return {
        success: false,
        message: t("errors.blogNotFound"),
        status: 404,
      };
    }

    if (!parentCommentId) {
      // Add comment to the blo and increment the comment count
      await Promise.all([
        // Create a new comment
        prisma.blogComment.create({
          data: {
            content: data.content,
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

        // Increment the comment count
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
      ]);

      return {
        success: true,
        message: t("success.description"),
        status: 201,
      };
    }

    const parentComment = await prisma.blogComment.findUnique({
      where: {
        id: parentCommentId,
      },
    });
    if (!parentComment) {
      return {
        success: false,
        message: t("errors.parentCommentNotFound"),
        status: 404,
      };
    }

    // Add comment to the blog, increment the comment count and increment the parent comment count
    await Promise.all([
      // Create a new comment
      prisma.blogComment.create({
        data: {
          content: data.content,
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
          parent: {
            connect: {
              id: parentCommentId,
            },
          },
        },
      }),

      // Increment the comment count
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

      // Increment the parent comment count
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

    return {
      success: true,
      message: t("success.description"),
      status: 201,
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
