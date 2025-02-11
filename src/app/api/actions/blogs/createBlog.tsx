"use server";

import { auth } from "@/auth";
import { blogSchema, BlogSchema } from "@/schemas/blog.schema";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";

export default async function createBlog(data: BlogSchema) {
  try {
    const translation = getTranslations("CreateBlogPage.server");
    const sessionRequest = auth();

    const [t, session] = await Promise.all([translation, sessionRequest]);

    if (!session)
      return {
        success: false,
        message: t("notAuthenticated"),
        status: 401,
      };

    const safeData = blogSchema.safeParse(data);
    if (!safeData.success)
      return {
        success: false,
        message: t("invalidRequestBody"),
        status: 400,
      };

    const blog = await prisma.blog.create({
      data: {
        title: safeData.data.title,
        description: safeData.data.description,
        content: safeData.data.content,
        author: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });

    return {
      success: true,
      data: {
        id: blog.id,
      },
      message: t("success"),
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
