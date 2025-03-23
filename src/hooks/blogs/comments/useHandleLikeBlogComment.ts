import likeCommentBlog from "@/app/api/actions/blogs/comments/likeCommentBlog";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const useHandleLikeBlogComment = (
  commentId: string,
  defaultLikeCount: number,
  defaultUserLikes: boolean
) => {
  const [likeState, setLikeState] = useState({
    likeCount: defaultLikeCount,
    isLiked: defaultUserLikes,
  });
  const t = useTranslations("BlogPage.comment.server.like");

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => likeCommentBlog(commentId),
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(t("errors.title"), {
          description: res?.message,
        });

        return;
      }
      setLikeState((prevState) => ({
        likeCount: res?.data?.likeCount ?? prevState.likeCount,
        isLiked: res?.data?.userLikes ?? prevState.isLiked,
      }));
    },
  });

  return {
    likeState,
    mutate,
    isPending,
    data,
  };
};

export default useHandleLikeBlogComment;
