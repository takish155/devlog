"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useState } from "react";
import MoreBlogs, { MoreBlogsProps } from "./MoreBlogs";

const MoreBlogSection = ({ initialCursor }: MoreBlogsProps) => {
  const t = useTranslations("BlogPage");
  const [loadMore, setLoad] = useState(false);

  if (!loadMore) {
    return (
      <div className="flex mb-10">
        <Button
          className="mx-auto px-10"
          variant={"outline"}
          size={"lg"}
          onClick={() => setLoad(true)}
        >
          {t("loadMore")}
        </Button>
      </div>
    );
  }

  return <MoreBlogs initialCursor={initialCursor} />;
};

export default MoreBlogSection;
