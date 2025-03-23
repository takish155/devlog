import { prisma } from "@/../prisma/prisma";
import { getTranslations } from "next-intl/server";
import { MiddlewareResponse } from "../handleMiddleware";

export default async function blogExistsMiddleware(
  data?: { blogId: string },
  passedData?: any[]
): Promise<MiddlewareResponse> {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: data!.blogId,
      },
    });
    if (!blog) {
      const t = await getTranslations("BlogPage.server");

      return {
        pass: false,
        message: t("errors.notFound"),
        status: 404,
      };
    }

    return { pass: true, data: blog };
  } catch (error) {
    console.error(error);

    return {
      pass: false,
      message: "Internal server error",
      status: 500,
    };
  }
}
