"use server";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import { Session } from "next-auth";

export default async function likeCommentBlog(commentId: string) {
  try {
    const { pass, message, passedData, status } = await handleMiddleware({
      middleware: [authMiddleware],
    });
    if (!pass) {
      return {
        success: false,
        message,
        status,
      };
    }

    const session: Session = passedData![0];

    const translation = getTranslations("BlogPage.comment.server.like");
    const commentRequest = prisma.blogComment.findUnique({
      where: {
        id: commentId,
      },
    });

    const [t, comment] = await Promise.all([translation, commentRequest]);

    if (!comment) {
      return {
        success: false,
        message: t("errors.commentNotFound"),
        status: 404,
      };
    }

    const commentLike = await prisma.blogCommentLike.findFirst({
      where: {
        commentId,
        userId: session.user?.id,
      },
    });
    if (!commentLike) {
      // If the user didn't like the comment, like it, and increment the like count
      await Promise.all([
        prisma.blogCommentLike.create({
          data: {
            commentId,
            userId: session.user?.id as string,
          },
        }),
        prisma.blogComment.update({
          where: {
            id: commentId,
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
          likeCount: comment.likeCount + 1,
          userLikes: true,
        },
      };
    }

    // If the user liked the comment, unlike it, and decrement the like count
    await Promise.all([
      prisma.blogCommentLike.delete({
        where: {
          id: commentLike.id,
        },
      }),
      prisma.blogComment.update({
        where: {
          id: commentId,
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
        likeCount: comment.likeCount - 1,
        userLikes: false,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while liking the comment",
      status: 500,
    };
  }
}
