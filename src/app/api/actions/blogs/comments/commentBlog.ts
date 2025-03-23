"use server";

import { getTranslations } from "next-intl/server";
import { BlogCommentCardProps } from "@/app/api/blogs/[blogId]/comments/route";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import blogExistsMiddleware from "@/middlewares/blogs/blogExistsMiddleware";
import checkBlogCommentBody from "@/middlewares/blogs/comments/checkBlogCommentBody";
import { Session } from "next-auth";
import commentBlogService from "@/services/blogs/comments/commentBlogService";
import { BlogCommentType } from "@/schemas/blogComment.schema";
import { revalidateCommentCount } from "@/services/blogs/getCommentCountService";

export default async function commentBlog(
  data: BlogCommentType,
  blogId: string,
  parentCommentId?: string
): Promise<
  | {
      success: true;
      message: string;
      status: 201;
      data: BlogCommentCardProps;
    }
  | {
      success: false;
      message: string;
      status: 400 | 401 | 404 | 500;
    }
> {
  try {
    const { pass, message, status, passedData } = await handleMiddleware({
      middleware: [authMiddleware, blogExistsMiddleware, checkBlogCommentBody],
      data: {
        blogId,
        body: data,
      },
    });

    if (!pass) {
      return {
        success: false,
        message: message!,
        status: status as any,
      };
    }

    const session: Session = passedData![0];

    const translation = getTranslations("BlogPage.comment.server");
    const comment = commentBlogService(
      blogId,
      session.user!.id!,
      data.content,
      parentCommentId
    );

    const [t, { blogComment }] = await Promise.all([translation, comment]);

    revalidateCommentCount(blogId);

    return {
      success: true,
      data: {
        likeCount: 0,
        createdAt: blogComment.createdAt,
        id: blogComment.id,
        childCount: 0,
        content: blogComment.content,
        likes: [],
        user: {
          id: session.user?.id ?? "",
          username: session.user?.username,
          displayName: session.user?.displayName,
          image: session.user?.image ?? "",
        },
      },
      message: t("success.description"),
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
