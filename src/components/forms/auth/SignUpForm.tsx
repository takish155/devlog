"use client";

import useHandleSignUp from "@/hooks/auth/useHandleSignUp";
import React from "react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InputContainer from "@/components/ui/input-cotainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const { register, errors, handleSubmit, serverResponse, mutate, isPending } =
    useHandleSignUp();
  const t = useTranslations("SignUpPage");

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
        label={t("displayName")}
        id="displayName"
        error={
          errors.displayName ? t(errors.displayName.message as any) : undefined
        }
      >
        <Input placeholder="John Doe" {...register("displayName")} />
      </InputContainer>
      <InputContainer
        label={t("email")}
        id="email"
        error={errors.email ? t(errors.email.message as any) : undefined}
      >
        <Input placeholder="johndoe@gmail.com" {...register("email")} />
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
      <InputContainer
        label={t("confirmPassword")}
        id="confirmPassword"
        error={
          errors.confirmPassword ? t(errors.confirmPassword.message as any) : ""
        }
      >
        <Input
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
        />
      </InputContainer>

      <Button
        className="w-full my-4"
        type="submit"
        disabled={isPending || serverResponse?.success}
      >
        {t("submit")}
      </Button>
    </form>
  );
};

export default SignUpForm;
