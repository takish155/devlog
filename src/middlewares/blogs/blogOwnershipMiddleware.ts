import { Blog } from "@prisma/client";
import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";

// Usage requirement: The session and blog must be passed in the passedData array
export default async function blogOwnershipMiddleware(
  data?: any,
  passedData?: any[]
) {
  const session: Session = passedData![0];
  const blog: Blog = passedData![1];

  if (blog.authorId !== session.user?.id) {
    const t = await getTranslations("BlogPage.server.errors");

    return {
      pass: false,
      message: t("notAuthenticated"),
      status: 403,
    };
  }

  return { pass: true };
}
