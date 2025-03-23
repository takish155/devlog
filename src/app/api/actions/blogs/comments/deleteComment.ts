"use server";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import commentExists from "@/middlewares/blogs/comments/commentExists";
import commentOwnership from "@/middlewares/blogs/comments/commentOwnership";
import authMiddleware from "@/middlewares/authMiddleware";
import { revalidateCommentCount } from "@/services/blogs/getCommentCountService";

export default async function deleteComment(commentId: string) {
  try {
    const { pass, message, status } = await handleMiddleware({
      middleware: [authMiddleware, commentExists, commentOwnership],
      data: { commentId },
    });
    if (!pass) {
      return {
        success: false,
        status,
        message,
      };
    }
    const translation = getTranslations("BlogPage.comment.server.delete");

    // Delete comment
    const deleteRequest = prisma.blogComment.delete({
      where: {
        id: commentId,
      },
    });

    const [t, deletedComment] = await Promise.all([translation, deleteRequest]);
    revalidateCommentCount(deletedComment.blogId);

    if (deletedComment.parentId) {
      await prisma.blogComment.update({
        where: {
          id: deletedComment.parentId,
        },
        data: {
          childCount: {
            decrement: 1,
          },
        },
      });
    }

    return {
      success: true,
      status: 200,
      message: t("success.description"),
    };

    // Catch any errors
  } catch (error) {
    console.error(error);

    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}
