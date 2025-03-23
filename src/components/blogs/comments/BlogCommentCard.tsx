import { BlogCommentCardProps } from "@/app/api/blogs/[blogId]/comments/route";
import AuthorInfoCard from "@/components/users/AuthorInfoCard";
import useHandleDeleteComment from "@/hooks/blogs/comments/useHandleDeleteComment";
import React, { Dispatch, SetStateAction } from "react";
import BlogCommentCardAction from "./BlogCommentCardAction";
import { BlogCommentChildrenProvider } from "@/contexts/BlogCommentChildrenProvider";
import CommentChildrenSection from "./children/CommentChildrenSection";

const BlogCommentCard = ({
  data,
  setCommentCount,
  blogId,
  layer,
}: {
  data: BlogCommentCardProps;
  setCommentCount: Dispatch<SetStateAction<number>>;
  blogId: string;
  layer?: number;
}) => {
  const {
    mutate: deleteComment,
    isPending: isDeletePending,
    isDeleted,
  } = useHandleDeleteComment(data.id, setCommentCount);

  const date = new Date(data.createdAt);

  if (isDeleted) return null;

  return (
    <section className="mb-10">
      <BlogCommentChildrenProvider>
        <AuthorInfoCard
          displayName={data.user.displayName}
          image={data.user.image}
          username={data.user.username}
          createdAt={date}
        />

        <p className="mb-4 text-sm">{data.content}</p>

        <BlogCommentCardAction
          authorId={data.user.id}
          childCount={data.childCount}
          commentId={data.id}
          defaultLikeCount={data.likeCount}
          defaultUserLikes={data.likes.length !== 0 ? true : false}
          deleteComment={deleteComment}
          isDeletePending={isDeletePending}
        />
        <CommentChildrenSection
          parentId={data.id}
          blogId={blogId}
          initialCount={data.childCount}
          layer={layer ? layer++ : 1}
        />
      </BlogCommentChildrenProvider>
    </section>
  );
};

export default BlogCommentCard;

// todo: fix layers
