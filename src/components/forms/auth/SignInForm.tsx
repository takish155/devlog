"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InputContainer from "@/components/ui/input-cotainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useHandleSignIn from "@/hooks/auth/useHandleSignIn";

const SignInForm = () => {
  const { register, errors, handleSubmit, serverResponse, mutate, isPending } =
    useHandleSignIn();
  const t = useTranslations("SignInPage");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      {serverResponse?.success === false && (
        <Alert variant={"destructive"} className="mb-6">
          <AlertTitle>{t("errors.error")}</AlertTitle>
          <AlertDescription>{serverResponse.message}</AlertDescription>
        </Alert>
      )}
      <InputContainer
        label={t("username")}
        id="username"
        error={errors.username ? t(errors.username.message as any) : undefined}
      >
        <Input placeholder="johndoe_123" {...register("username")} />
      </InputContainer>

      <InputContainer
        label={t("password")}
        id="password"
        error={errors.password ? t(errors.password.message as any) : undefined}
      >
        <Input
          type="password"
          placeholder="********"
          {...register("password")}
        />
      </InputContainer>

      <div className="flex flex-col items-center mt-10">
        <Button
          className="w-full"
          type="submit"
          disabled={isPending || serverResponse?.success}
        >
          {t("submit")}
        </Button>
        <p className="text-xs my-5">OR</p>
        <Link href="/auth/sign-up" className="w-full">
          <Button variant={"outline"} type="button" className="w-full">
            {t("noAccount")}
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
