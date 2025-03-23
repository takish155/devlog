"use client";

import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { useBlogCommentContext } from "@/contexts/BlogCommentProvider";
import { MessageCircleIcon } from "lucide-react";
import React from "react";

const BlogCommentSheetTriggerButton = () => {
  const { commentCount } = useBlogCommentContext() || {};

  return (
    <SheetTrigger asChild>
      <Button variant={"outline"} size={"sm"}>
        <MessageCircleIcon /> {commentCount}
      </Button>
    </SheetTrigger>
  );
};

export default BlogCommentSheetTriggerButton;
