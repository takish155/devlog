import getBlogByPopular from "@/lib/fetcher/blogs/getBlogByPopular";
import { APIResponse } from "./api.types";

export type BlogCardProps = Awaited<
  ReturnType<typeof getBlogByPopular>
>[number];
export type GetHomeBlogResponse = APIResponse<BlogCardProps[]>;
