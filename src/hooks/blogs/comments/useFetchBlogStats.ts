import { GetBlogCommentCountResponse } from "@/app/api/blogs/[blogId]/comments/count/route";
import { GetBlogLikeCountResponse } from "@/app/api/blogs/[blogId]/like/count/route";
import { useQuery } from "@tanstack/react-query";

const useFetchBlogStats = (blogId: string) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: [`blog-${blogId}-stats-count`],
    queryFn: async () => {
      const commentResponse = fetch(`/api/blogs/${blogId}/comments/count`);
      const likeResponse = fetch(`/api/blogs/${blogId}/like/count`);

      const [commentRes, likeRes] = await Promise.all([
        commentResponse,
        likeResponse,
      ]);

      const commentJson: Promise<GetBlogCommentCountResponse> =
        commentRes.json();
      const likeJson: Promise<GetBlogLikeCountResponse> = likeRes.json();

      const [commentData, likeData] = await Promise.all([
        commentJson,
        likeJson,
      ]);

      if (!commentData.success || !likeData.success) {
        throw new Error("Failed to fetch comment count");
      }

      return {
        commentCount: commentData.data.count,
        like: {
          count: likeData.data.count,
          userLike: likeData.data.userLike,
        },
      };
    },
  });

  return { isLoading, data, isError };
};

export default useFetchBlogStats;
