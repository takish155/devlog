import likeBlog from "@/app/api/actions/blogs/likeBlog";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const useHandleLikeBlog = (
  defaultLikeCount: number,
  defaultUserLike: boolean,
  blogId: string
) => {
  const [data, setData] = useState({
    likeCount: defaultLikeCount,
    userLike: defaultUserLike,
  });
  const t = useTranslations("BlogPage");

  const { mutate, isPending } = useMutation({
    mutationFn: () => likeBlog(blogId),
    onSettled: (res) => {
      if (res?.success) {
        setData(() => res.data!);
        return;
      }

      toast.error(t("server.errors.title"), {
        description: res?.message,
      });
    },
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export default useHandleLikeBlog;
