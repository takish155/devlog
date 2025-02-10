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

      <div className="flex flex-wrap">
        <Link className="ml-auto mb-4" href="/auth/forgot-password" passHref>
          <Button variant={"link"}>{t("forgotPassword")}</Button>
        </Link>
        <Button
          size={"lg"}
          className="w-full mb-4"
          type="submit"
          disabled={isPending || serverResponse?.success}
        >
          {t("submit")}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
