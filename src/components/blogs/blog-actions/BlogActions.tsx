"use client";

import useFetchBlogStats from "@/hooks/blogs/comments/useFetchBlogStats";
import React from "react";
import { Button } from "../../ui/button";
import { useSession } from "@/contexts/SessionProvider";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LikeBlog from "./LikeBlog";
import dynamic from "next/dynamic";
import { MessageCircleIcon, ThumbsUp } from "lucide-react";
import DeleteBlog from "./DeleteBlog";
import Spinner from "@/components/ui/spinner";

interface BlogActionProps {
  blogId: string;
  authorId: string;
}

const BlogCommentSheet = dynamic(() => import("../comments/BlogCommentSheet"), {
  ssr: false,
  loading: () => (
    <Button variant={"outline"} size={"sm"}>
      <MessageCircleIcon /> -
    </Button>
  ),
});

const BlogActions = ({ blogId, authorId }: BlogActionProps) => {
  const { data, isError, isLoading } = useFetchBlogStats(blogId);
  const { isLoading: sessionIsLoading, session } = useSession()!;
  const t = useTranslations("BlogPage");

  if (sessionIsLoading) return <Spinner />;

  if (isError) return null;

  return (
    <section className="flex gap-2">
      {isLoading ? (
        <>
          <Button variant={"outline"} size={"sm"}>
            <ThumbsUp /> -
          </Button>
          <Button variant={"outline"} size={"sm"}>
            <MessageCircleIcon /> -
          </Button>
        </>
      ) : (
        <>
          {/* Like Button */}
          <LikeBlog
            blogId={blogId}
            likeCount={data?.like.count ?? 0}
            userLikes={data?.like.userLike ?? false}
          />

          {/* Comment Button */}
          <BlogCommentSheet
            commentCount={data?.comment.count ?? 0}
            blogId={blogId}
          />
        </>
      )}

      {/* Edit Button */}
      {session && authorId === session.user?.id && (
        <>
          <Link href={`/blogs/${blogId}/edit`}>
            <Button variant={"outline"} size={"sm"}>
              {t("edit")}
            </Button>
          </Link>
          <DeleteBlog blogId={blogId} />
        </>
      )}
    </section>
  );
};

export default BlogActions;
