"use client";

import useFetchBlogComments from "@/hooks/blogs/comments/useFetchBlogComments";
import React from "react";
import BlogCommentCard from "../BlogCommentCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";

const CommentChildrens = ({
  blogId,
  parentId,
  layer = 1,
}: {
  parentId: string;
  blogId: string;
  layer?: number;
}) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchBlogComments(
    blogId,
    parentId
  );
  const { setCommentCount, comment } = useBlogCommentContext()!;

  const t = useTranslations("BlogPage.comment");

  return (
    <section className="mb-16">
      {comment?.map((comment) => {
        return (
          <BlogCommentCard
            data={comment}
            key={comment.id}
            setCommentCount={setCommentCount}
            blogId={blogId}
            layer={layer}
          />
        );
      })}
      {data?.pages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            {page.map((comment) => {
              return (
                <BlogCommentCard
                  data={comment}
                  key={comment.id}
                  setCommentCount={setCommentCount}
                  blogId={blogId}
                  layer={layer}
                />
              );
            })}
          </React.Fragment>
        );
      })}
      {hasNextPage && !isLoading && (
        <Button
          size={"sm"}
          variant={"link"}
          className="text-black"
          onClick={() => fetchNextPage()}
        >
          {t("showMoreReplies")}
        </Button>
      )}
    </section>
  );
};

export default CommentChildrens;
