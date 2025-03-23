import updateBlog from "@/app/api/actions/blogs/updateBlog";
import { blogSchema, BlogSchema } from "@/schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleEditBlog = () => {
  const t = useTranslations("EditBlogPage");
  const { blogId } = useParams<{ blogId: string }>();

  // Hanlde form
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
  });

  // Handle updating blog
  const {
    mutate,
    data: serverResponse,
    isPending,
  } = useMutation({
    mutationFn: (data: BlogSchema) => updateBlog(blogId, data),
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(t("server.errors.title"), {
          description: res?.message,
        });

        return;
      }

      toast.success(t("server.success.title"), {
        description: res?.message,
      });
    },
  });

  return {
    register,
    errors,
    handleSubmit,
    watch,
    mutate,
    serverResponse,
    isPending,
    setValue,
  };
};

export type UseHandleEditBlog = ReturnType<typeof useHandleEditBlog>;

export default useHandleEditBlog;
