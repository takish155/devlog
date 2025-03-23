"use client";

import { GetBlogCommentResponse } from "@/app/api/blogs/[blogId]/comments/route";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useFetchBlogComments = (blogId: string, parentId?: string) => {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") ?? "likes";

  const queryKey = parentId
    ? [`blog-${blogId}-comments`, `comment-${parentId}-children`]
    : [`blog-${blogId}-comments`];

  const { data, isLoading, fetchNextPage, hasNextPage, isRefetching } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = "" }) => {
        const response = await fetch(
          `/api/blogs/${blogId}/comments?orderBy=${orderBy}&cursor=${pageParam}&parentId=${parentId}`,
          {
            cache: "no-cache",
          }
        );
        const json: GetBlogCommentResponse = await response.json();

        if (!json.success) {
          throw new Error("Failed to fetch comments");
        }

        return json.data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.length !== 10) return null;

        return lastPage[lastPage.length - 1].id;
      },
      initialPageParam: "",
    });

  return { data, isLoading, fetchNextPage, hasNextPage, isRefetching };
};

export default useFetchBlogComments;
