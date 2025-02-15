import { GetBlogCommentResponse } from "@/app/api/blogs/[blogId]/comments/route";
import { useQuery } from "@tanstack/react-query";

const useFetchBlogComments = (blogId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`blog-${blogId}-comments`],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${blogId}/comments`);
      const json: GetBlogCommentResponse = await response.json();

      if (!json.success) {
        throw new Error("Failed to fetch comments");
      }

      return json.data;
    },
  });

  return { data, isLoading };
};

export default useFetchBlogComments;
