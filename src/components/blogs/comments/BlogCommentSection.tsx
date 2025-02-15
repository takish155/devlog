"use client";

import useFetchBlogComments from "@/hooks/blogs/comments/useFetchBlogComments";
import React from "react";

const BlogCommentSection = ({ blogId }: { blogId: string }) => {
  const { data, isLoading } = useFetchBlogComments(blogId);

  if (isLoading) {
    return <section>Loading comments...</section>;
  }

  return <section>{}</section>;
};

export default BlogCommentSection;
