"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import useUpdateQueryParams from "@/components/useUpdateQueryParams";
import { useSearchParams } from "next/navigation";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";

const BlogCommentSort = () => {
  const { commentCount } = useBlogCommentContext()!;
  const t = useTranslations("BlogPage.comment.sort");
  const updateQueryParams = useUpdateQueryParams();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") ?? "likes";

  if (commentCount === 0) return null;

  return (
    <div className="mb-7">
      <Select
        defaultValue={orderBy}
        onValueChange={(val) => {
          updateQueryParams("orderBy", val);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="likes">{t("likes")}</SelectItem>
          <SelectItem value="newest">{t("newest")}</SelectItem>
          <SelectItem value="oldest">{t("oldest")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlogCommentSort;
