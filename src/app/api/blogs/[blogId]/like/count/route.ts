import { prisma } from "@/../prisma/prisma";
import { auth } from "@/auth";

export type GetBlogLikeCountResponse =
  | {
      success: true;
      message: string;
      data: {
        count: number;
        userLike: boolean;
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
    const sessionRequest = auth();
    const [session, { blogId }] = await Promise.all([sessionRequest, params]);

    if (!session) {
      const likeCount = await prisma.blogLike.count({
        where: { blogId },
      });

      return Response.json({
        success: true,
        message: "Like count fetched successfully",
        data: {
          count: likeCount,
          userLike: false,
        },
        status: 200,
      });
    }

    const [userLike, likeCount] = await Promise.all([
      prisma.blogLike.findFirst({
        where: { blogId, userId: session.user?.id },
      }),
      // Having two same query might be bad but this should be fine for the performance
      prisma.blogLike.count({
        where: { blogId },
      }),
    ]);

    if (!userLike) {
      return Response.json({
        success: true,
        message: "Like count fetched successfully",
        data: {
          count: likeCount,
          userLike: false,
        },
        status: 200,
      });
    }

    return Response.json({
      success: true,
      message: "Like count fetched successfully",
      data: {
        count: likeCount,
        userLike: true,
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
