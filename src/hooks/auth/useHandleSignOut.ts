import signOut from "@/app/api/actions/auth/signOut";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const useHandleSignOut = () => {
  const t = useTranslations("SignInPage");
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => signOut(),
    onSettled: (data) => {
      if (data?.success) {
        toast.success(t("signOut.title"), {
          description: t("signOut.description"),
        });

        router.push("/auth/sign-in");
        router.refresh();
      }
    },
  });

  return { mutate, isPending };
};

export default useHandleSignOut;
