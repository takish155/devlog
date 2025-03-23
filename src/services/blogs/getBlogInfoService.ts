import checkIfUserLikesBlogService from "./checkIfUserLikesBlogService";
import { getCommentCount } from "./comments/getCommentCount";
import getBlogLikeCountService from "./getBlogLikeCountService";

export default async function getBlogInfoService(
  blogId: string,
  userId?: string
) {
  const commentCountRequest = getCommentCount(blogId);
  const likeCountRequest = getBlogLikeCountService(blogId);
  const userLikesRequest = checkIfUserLikesBlogService(blogId, userId);

  const [commentCount, likeCount, userLike] = await Promise.all([
    commentCountRequest,
    likeCountRequest,
    userLikesRequest,
  ]);

  return {
    comment: {
      count: commentCount,
    },
    like: {
      count: likeCount,
      userLike,
    },
  };
}
