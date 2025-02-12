"use client";

import useFetchBlogStats from "@/hooks/blogs/comments/useFetchBlogStats";
import React from "react";
import { Button } from "../ui/button";
import { Heart, MessageCircleIcon, ThumbsUp } from "lucide-react";

interface BlogActionProps {
  blogId: string;
}

const BlogActions = ({ blogId }: BlogActionProps) => {
  const { data, isError, isLoading } = useFetchBlogStats(blogId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex gap-2">
      <Button variant={"outline"} size={"sm"}>
        <ThumbsUp /> {data?.likeCount}
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <MessageCircleIcon /> {data?.commentCount}
      </Button>
    </section>
  );
};

export default BlogActions;
