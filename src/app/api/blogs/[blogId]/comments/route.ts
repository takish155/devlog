import { prisma } from "@/../prisma/prisma";

export interface GetBlogCommentResponse {
  success: true;
  message: string;
  data: {
    likeCount: number;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      username: string;
      displayName: string;
      image: string;
    };
  }[];
  status: number;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const { blogId } = await params;

    const comment = await prisma.blogComment.findMany({
      where: { blogId },
      select: {
        likeCount: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    return Response.json({
      success: true,
      message: "Comments fetched successfully",
      data: comment,
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Failed to fetch comments",
      status: 500,
    });
  }
}
