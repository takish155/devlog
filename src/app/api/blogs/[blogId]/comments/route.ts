import { auth } from "@/auth";
import getBlogCommentChildren from "@/lib/fetcher/getBlogCommentChildren";
import getBlogComments from "@/lib/fetcher/getBlogComments";
import { NextRequest } from "next/server";

export interface BlogCommentCardProps {
  likeCount: number;
  content: string;
  createdAt: Date;
  childCount: number;
  id: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    image: string;
  };
  likes: {
    id: string;
  }[];
}

export interface GetBlogCommentResponse {
  success: true;
  message: string;
  data: BlogCommentCardProps[];
  status: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const sessionRequest = auth();
    const [session, { blogId }] = await Promise.all([sessionRequest, params]);

    const searchParams = req.nextUrl.searchParams;
    const orderBy = searchParams.get("orderBy") ?? "likes";
    const cursor = searchParams.get("cursor") ?? undefined;
    const parentId = searchParams.get("parentId") ?? null;

    if (parentId === "undefined" || parentId === "null" || !parentId) {
      const comments = await getBlogComments({
        blogId,
        orderBy,
        session,
        cursor,
      });

      return Response.json({
        success: true,
        message: "Comments fetched successfully",
        data: comments,
        status: 200,
      });
    }

    const comments = await getBlogCommentChildren({
      parentId,
      cursor,
      session,
    });

    return Response.json({
      success: true,
      message: "Comments children fetched successfully",
      data: comments,
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
