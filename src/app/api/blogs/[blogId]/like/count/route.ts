import { prisma } from "@/../prisma/prisma";

export type GetBlogLikeCountResponse =
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

    const likeCount = await prisma.blogLike.count({
      where: { blogId },
    });

    return Response.json({
      success: true,
      message: "Like count fetched successfully",
      data: {
        count: likeCount,
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
