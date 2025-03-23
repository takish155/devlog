import { useBlogCommentChildrenContext } from "@/contexts/BlogCommentChildrenProvider";
import React from "react";
import CommentChildrens from "./CommentChildrens";
import CommentBlogForm from "@/components/forms/blog/CommentBlogForm";
import { BlogCommentProvider } from "@/contexts/BlogCommentProvider";

const CommentChildrenSection = ({
  parentId,
  blogId,
  initialCount,
  layer = 1,
}: {
  parentId: string;
  blogId: string;
  initialCount: number;
  layer?: number;
}) => {
  const { isOpen } = useBlogCommentChildrenContext()!;

  if (!isOpen) return null;

  return (
    <div className={`my-8 pl-[${layer * 2}rem]`}>
      <BlogCommentProvider initialCount={initialCount}>
        <CommentBlogForm parentId={parentId} blogId={blogId} small />
        <CommentChildrens parentId={parentId} blogId={blogId} layer={layer} />
      </BlogCommentProvider>
    </div>
  );
};

export default CommentChildrenSection;
