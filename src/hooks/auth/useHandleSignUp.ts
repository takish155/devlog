import signUp from "@/app/api/actions/auth/signUp";
import { useRouter } from "@/i18n/routing";
import { signUpSchema, SignUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHandleSignUp = () => {
  const router = useRouter();
  const t = useTranslations("SignUpPage");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    mutate,
    isPending,
    data: serverResponse,
  } = useMutation({
    mutationFn: (data: SignUpSchema) => signUp(data),
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

export default useHandleSignUp;
