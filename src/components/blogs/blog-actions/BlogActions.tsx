"use client";

import useFetchBlogStats from "@/hooks/blogs/comments/useFetchBlogStats";
import React from "react";
import { Button } from "../../ui/button";
import { MessageCircleIcon, ThumbsUp } from "lucide-react";
import { useSession } from "@/contexts/SessionProvider";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LikeBlog from "./LikeBlog";
import BlogComment from "../comments/BlogComment";

interface BlogActionProps {
  blogId: string;
  authorId: string;
}

const BlogActions = ({ blogId, authorId }: BlogActionProps) => {
  const { data, isError, isLoading } = useFetchBlogStats(blogId);
  const session = useSession();
  const t = useTranslations("BlogPage");

  return (
    <section className="flex gap-2">
      {isLoading ? (
        <Button variant={"outline"} size={"sm"}>
          <ThumbsUp /> -
        </Button>
      ) : (
        <LikeBlog
          blogId={blogId}
          likeCount={data?.like.count ?? 0}
          userLikes={data?.like.userLike ?? false}
        />
      )}
      {isLoading ? (
        <Button variant={"outline"} size={"sm"}>
          <MessageCircleIcon /> -
        </Button>
      ) : (
        <BlogComment commentCount={data?.commentCount ?? 0} blogId={blogId} />
      )}
      {session && authorId === session.user?.id && (
        <Link href={`/blogs/${blogId}/edit`}>
          <Button variant={"outline"} size={"sm"}>
            {t("edit")}
          </Button>
        </Link>
      )}
    </section>
  );
};

export default BlogActions;
