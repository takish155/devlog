import { prisma } from "@/../prisma/prisma";

export type GetBlogCommentCountResponse =
  | {
      success: true;
      message: string;
      data: {
        count: number;
      };
      status: number;
    }
  | {
      success: false;
      message: string;
      status: number;
    };

export async function GET(
  req: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const { blogId } = await params;

    const commentCount = await prisma.blogComment.count({
      where: { blogId },
    });

    return Response.json({
      success: true,
      message: "Comment count fetched successfully",
      data: {
        count: commentCount,
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Failed to fetch comment count",
      status: 500,
    });
  }
}
