import { Sheet, SheetContent } from "@/components/ui/sheet";
import React from "react";
import BlogCommentSection from "./BlogCommentSection";
import CommentBlogForm from "@/components/forms/blog/CommentBlogForm";
import { BlogCommentProvider } from "@/contexts/BlogCommentProvider";
import BlogCommentSheetHeader from "./BlogCommentSheetHeader";
import BlogCommentSheetTriggerButton from "./BlogCommentSheetTriggerButton";

const BlogCommentSheet = ({
  commentCount,
  blogId,
}: {
  commentCount: number;
  blogId: string;
}) => {
  return (
    <BlogCommentProvider initialCount={commentCount}>
      <Sheet>
        <BlogCommentSheetTriggerButton />
        <SheetContent className="text-muted-foreground overflow-y-scroll min-w-[700px] max-md:min-w-[95vw]">
          <BlogCommentSheetHeader />
          <CommentBlogForm blogId={blogId} />
          <BlogCommentSection blogId={blogId} />
        </SheetContent>
      </Sheet>
    </BlogCommentProvider>
  );
};

export default BlogCommentSheet;
