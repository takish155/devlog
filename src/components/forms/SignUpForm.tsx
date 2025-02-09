"use client";

import useHandleSignUp from "@/hooks/auth/useHandleSignUp";
import React from "react";
import InputContainer from "../ui/input-cotainer";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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

      <div className="flex flex-col items-center mt-10">
        <Button
          className="w-full"
          type="submit"
          disabled={isPending || serverResponse?.success}
        >
          {t("submit")}
        </Button>
        <p className="text-xs my-5">OR</p>
        <Link href="/auth/sign-in" className="w-full">
          <Button variant={"outline"} type="button" className="w-full">
            {t("alreadyHave")}
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
