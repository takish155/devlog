import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import BlogCommentSection from "./BlogCommentSection";
import { MessageCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import CommentBlogForm from "@/components/forms/blog/CommentBlogForm";

const BlogComment = ({
  commentCount,
  blogId,
}: {
  commentCount: number;
  blogId: string;
}) => {
  const t = useTranslations("BlogPage.comment");

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"} size={"sm"}>
          <MessageCircleIcon /> {commentCount}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>
            {t("title", {
              count: commentCount,
            })}
          </SheetTitle>
        </SheetHeader>
        <CommentBlogForm />
        <BlogCommentSection blogId={blogId} />
      </SheetContent>
    </Sheet>
  );
};

export default BlogComment;
