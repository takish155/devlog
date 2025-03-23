import authMiddleware from "@/middlewares/authMiddleware";
import { handleMiddleware } from "@/middlewares/handleMiddleware";
import getBlogInfoService from "@/services/blogs/getBlogInfoService";
import { Session } from "next-auth";

export type GetBlogInfo =
  | {
      success: true;
      message: string;
      data: {
        comment: {
          count: number;
        };
        like: {
          count: number;
          userLike: boolean;
        };
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
    const middlewareRequest = handleMiddleware({
      middleware: [authMiddleware],
    });
    const [middleware, { blogId }] = await Promise.all([
      middlewareRequest,
      params,
    ]);

    const session: Session = middleware?.passedData
      ? middleware?.passedData![0]
      : "";

    const blogInfo = await getBlogInfoService(blogId, session.user?.id);

    return Response.json({
      success: true,
      message: "Like count fetched successfully",
      data: blogInfo,
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
