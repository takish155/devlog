"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputContainer from "@/components/ui/input-cotainer";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/components/ui/uploadthing";
import { useHandleCreateBlogContext } from "@/contexts/CreateBlogContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const BlogForm = ({
  defaultValue,
  context,
  buttonPlaceholder,
}: {
  defaultValue?: {
    title?: string;
    description?: string;
    content?: string;
    thumbnail?: string;
  };
  context: () => ReturnType<typeof useHandleCreateBlogContext>;
  buttonPlaceholder: string;
}) => {
  const t = useTranslations("CreateBlogPage.form");
  const {
    errors,
    handleSubmit,
    register,
    serverResponse,
    isPending,
    mutate,
    setValue,
    watch,
  } = context()!;

  const thumbnail = watch("thumbnail") ?? defaultValue?.thumbnail ?? "";

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
        <Input
          defaultValue={defaultValue?.title}
          placeholder={t("title")}
          {...register("title")}
        />
      </InputContainer>
      <InputContainer
        id="description"
        hideLabel
        error={
          errors.description &&
          t(("errors." + errors.description.message) as any)
        }
      >
        <Input
          defaultValue={defaultValue?.description}
          placeholder={t("description")}
          {...register("description")}
        />
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
          defaultValue={defaultValue?.content}
        ></Textarea>
      </InputContainer>
      <InputContainer id="thumbnail" label={t("thumbnail")}>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            width={"100"}
            height={"100"}
            className="w-[10%] h-auto mb-4"
          />
        )}
        <input
          type="hidden"
          {...register("thumbnail")}
          defaultValue={defaultValue?.thumbnail}
        />
        <div className="flex">
          <UploadButton
            className="mb-10"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setValue("thumbnail", res[0].ufsUrl);
            }}
            onUploadError={(err) => {
              alert(err);
            }}
          />
        </div>
      </InputContainer>
      <Button className="mb-10" disabled={isPending}>
        {buttonPlaceholder}
      </Button>
    </form>
  );
};

export default BlogForm;
