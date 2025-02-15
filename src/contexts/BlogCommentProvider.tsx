"use client";

import { createContext, useContext } from "react";

const BlogCommentContext = createContext<null>(null);

export const BlogCommentProvider = ({
  children,
  blogId,
}: {
  children: React.ReactNode;
  blogId: string;
}) => {
  return (
    <BlogCommentContext.Provider value={null}>
      {children}
    </BlogCommentContext.Provider>
  );
};

export const useBlogCommentContext = () => {
  return useContext(BlogCommentContext);
};
