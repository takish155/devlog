import deleteBlog from "@/app/api/actions/blogs/deleteBlog";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const useHandleDeleteBlog = (blogId: string) => {
  const t = useTranslations("DeleteBlog.server");
  const router = useRouter();

  useMutation({
    mutationFn: async () => deleteBlog(blogId),
    onSettled: (res) => {
      if (!res?.success) {
        toast.error(
          t("errors.title", {
            description: res?.message,
          })
        );

        return;
      }

      toast.success(
        t("success.title", {
          description: res?.message,
        })
      );

      router.push("/");
    },
  });
};

export default useHandleDeleteBlog;
