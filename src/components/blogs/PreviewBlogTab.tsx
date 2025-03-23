"use client";

import { useHandleCreateBlogContext } from "@/contexts/CreateBlogContext";
import React from "react";
import Markdown from "../ui/markdown";
import BlogCard from "./BlogCard";
import { useSession } from "@/contexts/SessionProvider";
import { useTranslations } from "next-intl";
import Spinner from "../ui/spinner";

interface PreviewBlogTabProps {
  context: () => ReturnType<typeof useHandleCreateBlogContext>;
}

const PreviewBlogTab = ({ context }: PreviewBlogTabProps) => {
  const { watch } = context()!;
  const { isLoading, session } = useSession()!;

  const t = useTranslations("BlogPage");

  const title = watch("title");
  const description = watch("description");
  const content = watch("content");
  const thumbnail = watch("thumbnail");

  if (isLoading) return <Spinner />;

  return (
    <section>
      <BlogCard
        clickable={false}
        data={{
          title,
          description,
          createdAt: new Date(),
          thumbnail: thumbnail ?? "",
          author: {
            displayName: session?.user?.displayName,
            image: session?.user?.image,
            username: session?.user?.username,
          },
          commentCount: 0,
          likeCount: 0,
          id: "",
        }}
      />
      <Markdown>{content ? content : t("preview.noContent")}</Markdown>
    </section>
  );
};

export default PreviewBlogTab;
