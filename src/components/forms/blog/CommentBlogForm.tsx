"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import InputContainer from "@/components/ui/input-cotainer";
import Profile from "@/components/ui/profile";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { useSession } from "@/contexts/SessionProvider";
import useHandleCommentBlog from "@/hooks/blogs/blog-actions/useHandleCommentBlog";
import React from "react";
import { useTranslations } from "use-intl";

const CommentBlogForm = ({
  blogId,
  parentId,
  small = false,
}: {
  blogId: string;
  parentId?: string;
  small?: boolean;
}) => {
  const { setComment, setCommentCount } = useBlogCommentContext()!;
  const {
    errors,
    handleSubmit,
    isPending,
    mutate,
    register,
    data: serverResponse,
  } = useHandleCommentBlog(blogId, setComment, setCommentCount);
  const t = useTranslations("BlogPage.comment");
  const { session, isLoading } = useSession()!;

  if (isLoading) return <Spinner />;

  if (!session)
    return (
      <div className="mb-5">
        <p className="text-sm">{t("form.signIn")}</p>
      </div>
    );

  return (
    <form
      className="mb-7"
      onSubmit={handleSubmit((data) => {
        mutate({
          data,
          parentCommentId: parentId,
        });
      })}
    >
      {serverResponse?.success === false && (
        <Alert variant={"destructive"} className="mb-6">
          <AlertTitle>{t("server.errors.title")}</AlertTitle>
          <AlertDescription>{serverResponse.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2 items-center mb-2 text-sm">
        <Profile src={session?.user.image ?? ""} />
        <p>{session?.user.displayName}</p>
      </div>
      <InputContainer
        hideLabel
        noMargin
        id="comment"
        error={errors.content ? t(errors.content.message as any) : ""}
      >
        <Textarea
          {...register("content")}
          placeholder={small ? "" : t("form.placeholder")}
          className={`${small ? "min-h-[10vh]" : "min-h-[25vh]"}`}
        />
      </InputContainer>
      <Button className="mr-auto mt-2" size={"sm"} disabled={isPending}>
        {t("form.submit")}
      </Button>
    </form>
  );
};

export default CommentBlogForm;
