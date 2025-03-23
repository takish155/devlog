"use client";

import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { useTranslations } from "next-intl";
import React from "react";

const BlogCommentSheetHeader = () => {
  const t = useTranslations("BlogPage.comment");
  const { commentCount } = useBlogCommentContext() || {};

  return (
    <SheetHeader className="mb-5">
      <SheetTitle>
        {t("title", {
          count: commentCount,
        })}
      </SheetTitle>
    </SheetHeader>
  );
};

export default BlogCommentSheetHeader;
