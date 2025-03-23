"use server";

import { BlogSchema } from "@/schemas/blog.schema";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import blogExistsMiddleware from "@/middlewares/blogs/blogExistsMiddleware";
import blogOwnershipMiddleware from "@/middlewares/blogs/blogOwnershipMiddleware";
import checkBlogBodyMiddleware from "@/middlewares/blogs/checkBlogBodyMiddleware";
import { revalidateTag } from "next/cache";

export default async function updateBlog(blogId: string, data: BlogSchema) {
  try {
    const { pass, message, status } = await handleMiddleware({
      middleware: [
        authMiddleware,
        blogExistsMiddleware,
        blogOwnershipMiddleware,
        checkBlogBodyMiddleware,
      ],
      data: {
        blogId,
        body: data,
      },
    });

    if (!pass) {
      return {
        success: false,
        message: message,
        status: status,
      };
    }

    const translation = getTranslations("EditBlogPage.server");
    const blogRequest = prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        thumbnail: data.thumbnail ?? "",
      },
    });

    const [t, blog] = await Promise.all([translation, blogRequest]);

    revalidateTag(`/blogs/${blogId}`);
    revalidateTag(`author-${blog.authorId}`);

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
