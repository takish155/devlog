"use client";

import { createContext, useContext, useState } from "react";

const useHandleState = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    setIsOpen,
  };
};

type UseCommentType = ReturnType<typeof useHandleState>;

const BlogCommentChildrenContext = createContext<null | UseCommentType>(null);

export const BlogCommentChildrenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useHandleState();

  return (
    <BlogCommentChildrenContext.Provider value={state}>
      {children}
    </BlogCommentChildrenContext.Provider>
  );
};

export const useBlogCommentChildrenContext = () => {
  return useContext(BlogCommentChildrenContext);
};
