import { GetBlogInfo } from "@/app/api/blogs/[blogId]/info/route";
import { useQuery } from "@tanstack/react-query";

const useFetchBlogStats = (blogId: string) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: [`blog-${blogId}-stats-count`],
    queryFn: async () => {
      const req = await fetch(`/api/blogs/${blogId}/info`);
      const res: GetBlogInfo = await req.json();
      if (!res.success) {
        throw new Error("Failed to fetch blog stats");
      }

      return res.data;
    },
  });

  return { isLoading, data, isError };
};

export default useFetchBlogStats;
