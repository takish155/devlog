import { Button } from "@/components/ui/button";
import { BlogCommentProvider } from "@/contexts/BlogCommentProvider";
import { useSession } from "@/contexts/SessionProvider";
import useHandleLikeBlogComment from "@/hooks/blogs/comments/useHandleLikeBlogComment";
import { MessageCircleIcon, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import BlogCommentChildren from "./children/BlogCommentChildren";
import Spinner from "@/components/ui/spinner";

interface BlogCommentCardActionProps {
  authorId: string;
  childCount: number;
  commentId: string;
  defaultLikeCount: number;
  defaultUserLikes: boolean;
  deleteComment: () => void;
  isDeletePending: boolean;
}

const BlogCommentCardAction = ({
  authorId,
  childCount,
  commentId,
  defaultLikeCount,
  defaultUserLikes,
  deleteComment,
  isDeletePending,
}: BlogCommentCardActionProps) => {
  const { isPending, likeState, mutate } = useHandleLikeBlogComment(
    commentId,
    defaultLikeCount,
    defaultUserLikes
  );

  const { isLoading, session } = useSession()!;
  const t = useTranslations("BlogPage");

  if (isLoading) return <Spinner />;

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        size={"sm"}
        className={`${
          likeState.isLiked
            ? "text-primary border-primary hover:text-primary"
            : ""
        }`}
        onClick={() => mutate()}
        disabled={isPending}
      >
        <ThumbsUp /> {isPending ? "-" : likeState.likeCount}
      </Button>

      <BlogCommentProvider initialCount={childCount}>
        <BlogCommentChildren />
      </BlogCommentProvider>

      {session && authorId === session?.user!.id && (
        <Button
          disabled={isDeletePending}
          variant={"destructive"}
          size={"sm"}
          onClick={() => deleteComment()}
        >
          {t("delete")}
        </Button>
      )}
    </div>
  );
};

export default BlogCommentCardAction;
