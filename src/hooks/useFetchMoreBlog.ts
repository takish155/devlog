import { GetHomeBlogResponse } from "@/types/blogs.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useFetchMoreBlog = (initialPageParam: string) => {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") ?? "popular";

  const { hasNextPage, isFetching, data, fetchNextPage } = useInfiniteQuery({
    queryKey: [`more-blog-${orderBy}`],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/blogs?cursor=${pageParam}&orderBy=${orderBy}`,
        {
          cache: "no-cache",
        }
      );
      const json: GetHomeBlogResponse = await res.json();

      if (!json.success) {
        throw new Error("Failed to fetch more blog");
      }

      return json.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.length !== 10) return null;

      return lastPage[lastPage.length - 1].id;
    },
    initialPageParam: initialPageParam,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return { hasNextPage, isFetching, data, fetchNextPage, ref };
};

export default useFetchMoreBlog;
