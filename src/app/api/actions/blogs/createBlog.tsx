"use server";

import { BlogSchema } from "@/schemas/blog.schema";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import { Session } from "next-auth";
import checkBlogBodyMiddleware from "@/middlewares/blogs/checkBlogBodyMiddleware";

export default async function createBlog(data: BlogSchema) {
  try {
    const { pass, message, status, passedData } = await handleMiddleware({
      middleware: [authMiddleware, checkBlogBodyMiddleware],
      data: { body: data },
    });

    if (!pass) {
      return {
        success: false,
        message: message,
        status: status,
      };
    }

    const session: Session = passedData![0];

    const translation = getTranslations("CreateBlogPage.server");
    const blogPromise = prisma.blog.create({
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        thumbnail: data.thumbnail ?? "",
        author: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });

    const [t, blog] = await Promise.all([translation, blogPromise]);

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
