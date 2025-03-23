import commentBlog from "@/app/api/actions/blogs/comments/commentBlog";
import { BlogCommentCardProps } from "@/app/api/blogs/[blogId]/comments/route";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import {
  blogCommentSchema,
  BlogCommentType,
} from "@/schemas/blogComment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleCommentBlog = (
  blogId: string,
  setComment: Dispatch<SetStateAction<BlogCommentCardProps[]>>,
  setCommentCount: Dispatch<SetStateAction<number>>
) => {
  const t = useTranslations("BlogPage.comment");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<BlogCommentType>({
    resolver: zodResolver(blogCommentSchema),
  });

  const { mutate, isPending, data } = useMutation({
    mutationFn: (body: { data: BlogCommentType; parentCommentId?: string }) =>
      commentBlog(body.data, blogId, body.parentCommentId),
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(t("server.errors.title"), {
          description: t("server.errors.somethingWentWrong"),
        });

        return;
      }
      reset();

      toast.success(t("server.success.title"), {
        description: res.message,
      });

      // Handle automatic addition of comment
      setComment!((prev) => {
        return [res.data!, ...prev];
      });

      setCommentCount!((prev) => prev + 1);
    },
  });

  return {
    register,
    errors,
    isPending,
    mutate,
    data,
    handleSubmit,
  };
};

export default useHandleCommentBlog;
