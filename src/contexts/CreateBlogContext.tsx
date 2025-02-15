"use client";

import useHandleCreateBlog, {
  UseHandleCreateBlog,
} from "@/hooks/blogs/useHandleCreateBlog";
import { createContext, useContext } from "react";

const CreateBlogContext = createContext<UseHandleCreateBlog | null>(null);

export const CreateBlogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useHandleCreateBlog();

  return (
    <CreateBlogContext.Provider value={state}>
      {children}
    </CreateBlogContext.Provider>
  );
};

export const useHandleCreateBlogContext = () => {
  return useContext(CreateBlogContext);
};
