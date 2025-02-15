import createBlog from "@/app/api/actions/blogs/createBlog";
import { useRouter } from "@/i18n/routing";
import { blogSchema, BlogSchema } from "@/schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleCreateBlog = () => {
  const t = useTranslations("CreateBlogPage");
  const router = useRouter();

  // Hanlde form
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
  });

  // Handle create blog
  const {
    mutate,
    data: serverResponse,
    isPending,
  } = useMutation({
    mutationFn: (data: BlogSchema) => createBlog(data),
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(t("error"), {
          description: res?.message,
        });

        return;
      }

      toast.success(t("success"), {
        description: res?.message,
      });
      router.push(`/blogs/${res?.data?.id}`);
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
  };
};

export type UseHandleCreateBlog = ReturnType<typeof useHandleCreateBlog>;

export default useHandleCreateBlog;
