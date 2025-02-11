"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputContainer from "@/components/ui/input-cotainer";
import { Textarea } from "@/components/ui/textarea";
import { useHandleCreateBlogContext } from "@/contexts/CreateBlogContext";
import { useTranslations } from "next-intl";
import React from "react";

const CreateBlogForm = () => {
  const t = useTranslations("CreateBlogPage.form");
  const { errors, handleSubmit, register, serverResponse, isPending, mutate } =
    useHandleCreateBlogContext()! || {};

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      {serverResponse?.success === false && (
        <Alert variant={"destructive"} className="mb-6">
          <AlertTitle>{t("error")}</AlertTitle>
          <AlertDescription>{serverResponse.message}</AlertDescription>
        </Alert>
      )}
      <InputContainer
        id="title"
        hideLabel
        error={errors.title && t(("errors." + errors.title.message) as any)}
      >
        <Input placeholder={t("title")} {...register("title")} />
      </InputContainer>
      <InputContainer
        id="description"
        hideLabel
        error={
          errors.description &&
          t(("errors." + errors.description.message) as any)
        }
      >
        <Input placeholder={t("description")} {...register("description")} />
      </InputContainer>
      <InputContainer
        id="content"
        hideLabel
        error={errors.content && t(("errors." + errors.content.message) as any)}
      >
        <Textarea
          {...register("content")}
          placeholder={t("content")}
          className="min-h-[50vh]"
        ></Textarea>
      </InputContainer>
      <Button disabled={isPending}>{t("submit")}</Button>
    </form>
  );
};

export default CreateBlogForm;
