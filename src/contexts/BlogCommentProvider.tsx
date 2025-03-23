"use client";

import { BlogCommentCardProps } from "@/app/api/blogs/[blogId]/comments/route";
import { createContext, useContext, useState } from "react";

const useHandleInitialState = (initialCount: number) => {
  const [comment, setComment] = useState<BlogCommentCardProps[]>([]);
  const [commentCount, setCommentCount] = useState(initialCount);

  return {
    comment,
    setComment,
    commentCount,
    setCommentCount,
  };
};

type UseCommentType = ReturnType<typeof useHandleInitialState>;

const BlogCommentContext = createContext<null | UseCommentType>(null);

export const BlogCommentProvider = ({
  children,
  initialCount,
}: {
  children: React.ReactNode;
  initialCount: number;
}) => {
  const state = useHandleInitialState(initialCount);

  return (
    <BlogCommentContext.Provider value={state}>
      {children}
    </BlogCommentContext.Provider>
  );
};

export const useBlogCommentContext = () => {
  return useContext(BlogCommentContext);
};
