"use client";

import { Button } from "@/components/ui/button";
import { useBlogCommentChildrenContext } from "@/contexts/BlogCommentChildrenProvider";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { MessageCircleIcon } from "lucide-react";

const BlogCommentChildren = () => {
  const { setIsOpen, isOpen } = useBlogCommentChildrenContext()!;
  const { commentCount } = useBlogCommentContext()!;

  return (
    <Button variant={"outline"} size={"sm"} onClick={() => setIsOpen(!isOpen)}>
      <MessageCircleIcon /> {commentCount}
    </Button>
  );
};

export default BlogCommentChildren;
