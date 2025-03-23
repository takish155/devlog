import { BlogComment } from "@prisma/client";
import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";

export default async function commentOwnership(
  data?: { commentId: string },
  passedData?: any[]
) {
  const session: Session = passedData![0];
  const blog: BlogComment = passedData![1];

  if (session.user?.id !== blog.userId) {
    const t = await getTranslations("BlogPage.comment.server.delete");
    return {
      pass: false,
      message: t("errors.noPermissionToDelete"),
      status: 403,
    };
  }

  return { pass: true };
}
