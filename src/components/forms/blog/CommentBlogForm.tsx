"use client";

import { Button } from "@/components/ui/button";
import InputContainer from "@/components/ui/input-cotainer";
import Profile from "@/components/ui/profile";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/contexts/SessionProvider";
import React from "react";
import { useTranslations } from "use-intl";

const CommentBlogForm = () => {
  const t = useTranslations("BlogPage.comment");
  const session = useSession();

  if (!session)
    return (
      <div className="mb-5">
        <p className="text-sm">{t("form.signIn")}</p>
      </div>
    );

  return (
    <form className="mb-5">
      <div className="flex gap-2 items-center mb-2 text-sm">
        <Profile src={session?.user.image ?? ""} />
        <p>{session?.user.displayName}</p>
      </div>
      <InputContainer hideLabel noMargin id="comment">
        <Textarea
          placeholder={t("form.placeholder")}
          className="min-h-[25vh]"
        />
      </InputContainer>
      <Button className="mr-auto  mt-2">{t("form.submit")}</Button>
    </form>
  );
};

export default CommentBlogForm;
