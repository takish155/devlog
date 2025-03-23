import deleteComment from "@/app/api/actions/blogs/comments/deleteComment";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const useHandleDeleteComment = (
  commentId: string,
  setCommentCount: Dispatch<SetStateAction<number>>
) => {
  const t = useTranslations("BlogPage.comment.server.delete");
  const [isDeleted, setIsDeleted] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteComment(commentId),
    onMutate: () => {
      setIsDeleted(true);
    },
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(t("errors.title"), {
          description: res?.message,
        });

        setIsDeleted(false);

        return;
      }

      setCommentCount((prev) => prev - 1);

      toast.success(t("success.title"), {
        description: res?.message,
      });
    },
  });

  return {
    isDeleted,
    setIsDeleted,
    isPending,
    mutate,
  };
};

export default useHandleDeleteComment;
