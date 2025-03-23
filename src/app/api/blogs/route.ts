import getBlogs, { OrderByType } from "@/lib/fetcher/blogs/getBlogs";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  // todo: implement this to home page
  try {
    const searchParams = req.nextUrl.searchParams;

    const orderBy = searchParams.get("orderBy") as OrderByType | null;
    const cursor = searchParams.get("cursor");
    const query = searchParams.get("query");

    const blogs = await getBlogs({ orderBy, cursor, query });

    return Response.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Failed to fetch blogs",
      status: 500,
    });
  }
}
