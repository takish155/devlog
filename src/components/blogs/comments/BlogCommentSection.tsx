"use client";

import useFetchBlogComments from "@/hooks/blogs/comments/useFetchBlogComments";
import React, { useEffect } from "react";
import BlogCommentCard from "./BlogCommentCard";
import { Separator } from "@/components/ui/separator";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { useInView } from "react-intersection-observer";
import Spinner from "@/components/ui/spinner";
import { useTranslations } from "next-intl";
import BlogCommentSort from "./BlogCommentSort";

const BlogCommentSection = ({ blogId }: { blogId: string }) => {
  const t = useTranslations("BlogPage.comment");
  const { ref, inView } = useInView();
  const { comment, commentCount, setCommentCount } = useBlogCommentContext()!;
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useFetchBlogComments(blogId);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (commentCount === 0) {
    return <p className="text-sm mt-4">{t("noCommentYet")}</p>;
  }

  return (
    <article>
      <BlogCommentSort />

      {/* Renders the comments the user has made just now */}
      {comment?.map((comment) => {
        return (
          <BlogCommentCard
            data={comment}
            key={comment.id}
            setCommentCount={setCommentCount}
            blogId={blogId}
          />
        );
      })}

      {/* Renders the comments that are fetched from the server */}
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
                />
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Renders a container for the intersection observer to check if the user has
      reached the end of the comments */}
      {hasNextPage && <button ref={ref}></button>}
    </article>
  );
};

export default BlogCommentSection;
