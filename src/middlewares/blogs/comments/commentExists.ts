import { prisma } from "@/../prisma/prisma";
import { getTranslations } from "next-intl/server";

export default async function commentExists(
  data?: { commentId: string },
  passedData?: any[]
) {
  const comment = await prisma.blogComment.findUnique({
    where: {
      id: data!.commentId,
    },
  });

  if (!comment) {
    const t = await getTranslations("BlogPage.comment.server.delete");
    return {
      pass: false,
      message: t("errors.commentNotFound"),
      status: 404,
    };
  }

  return { pass: true, data: comment };
}
