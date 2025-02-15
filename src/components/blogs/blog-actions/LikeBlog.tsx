"use client";

import { Button } from "@/components/ui/button";
import useHandleLikeBlog from "@/hooks/blogs/blog-actions/useHandleLikeBlog";
import { ThumbsUp } from "lucide-react";
import React from "react";

const LikeBlog = ({
  blogId,
  likeCount,
  userLikes,
}: {
  likeCount: number;
  userLikes: boolean;
  blogId: string;
}) => {
  const { data, isPending, mutate } = useHandleLikeBlog(
    likeCount,
    userLikes,
    blogId
  );

  return (
    <Button
      variant={"outline"}
      className={`${
        data.userLike && !isPending
          ? "text-primary border-primary hover:text-primary hover:border-primary"
          : ""
      }`}
      size={"sm"}
      disabled={isPending}
      onClick={() => mutate()}
    >
      <ThumbsUp /> {isPending ? "-" : data.likeCount}
    </Button>
  );
};

export default LikeBlog;
