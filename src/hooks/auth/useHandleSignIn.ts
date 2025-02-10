import signIn from "@/app/api/actions/auth/signIn";
import { useRouter } from "@/i18n/routing";
import { SignInSchema, signInSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleSignIn = () => {
  const router = useRouter();
  const t = useTranslations("SignInPage");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const {
    mutate,
    isPending,
    data: serverResponse,
  } = useMutation({
    mutationFn: (data: SignInSchema) => signIn(data),
    onSettled: (data) => {
      if (data?.success) {
        toast.success(t("success.title"), {
          description: t("success.description"),
        });
        router.push("/");
        router.refresh();
      }
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    mutate,
    isPending,
    serverResponse,
  };
};

export default useHandleSignIn;
