"use server";

import { auth } from "@/auth";
import { blogSchema, BlogSchema } from "@/schemas/blog.schema";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";

export default async function updateBlog(blogId: string, data: BlogSchema) {
  try {
    const translation = getTranslations("EditBlogPage.server");
    const sessionRequest = auth();

    const [t, session] = await Promise.all([translation, sessionRequest]);

    // Check if user is authenticated
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
    // Check if blog exists
    if (!blog)
      return {
        success: false,
        message: t("errors.blogNotFound"),
        status: 404,
      };
    // Check if user is the author of the blog
    if (blog.authorId !== session.user?.id)
      return {
        success: false,
        message: t("errors.notAuthorized"),
        status: 403,
      };

    // Validate request body
    const safeData = blogSchema.safeParse(data);
    if (!safeData.success)
      return {
        success: false,
        message: t("errors.invalidRequestBody"),
        status: 400,
      };

    // Update blog
    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: safeData.data.title,
        description: safeData.data.description,
        content: safeData.data.content,
      },
    });

    return {
      success: true,
      data: {
        id: blog.id,
      },
      message: t("success.description"),
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
