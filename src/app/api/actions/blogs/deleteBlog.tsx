import authMiddleware from "@/middlewares/authMiddleware";
import blogExistsMiddleware from "@/middlewares/blogs/blogExistsMiddleware";
import blogOwnershipMiddleware from "@/middlewares/blogs/blogOwnershipMiddleware";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import { revalidatePath } from "@/i18n/routing";
import { revalidateTag } from "next/cache";

export default async function deleteBlog(blogId: string) {
  try {
    const { pass, message, status } = await handleMiddleware({
      middleware: [
        authMiddleware,
        blogExistsMiddleware,
        blogOwnershipMiddleware,
      ],
      data: {
        blogId,
      },
    });

    if (!pass) {
      return {
        success: false,
        message: message,
        status: status,
      };
    }

    const deleteRequest = prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    const translation = getTranslations("DeleteBlog.server");

    const [t, blog] = await Promise.all([translation, deleteRequest]);

    revalidatePath(`/blogs/${blogId}`);
    revalidateTag(`author-${blog.authorId}`);

    return {
      success: true,
      message: t("success.description"),
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error occurred while deleting the blog.",
      status: 500,
    };
  }
}
