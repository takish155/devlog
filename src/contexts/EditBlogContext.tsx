"use client";

import useHandleEditBlog, {
  UseHandleEditBlog,
} from "@/hooks/blogs/useHandleEditBlog";
import { createContext, useContext } from "react";

const EditBlogContext = createContext<UseHandleEditBlog | null>(null);

export const EditBlogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useHandleEditBlog();

  return (
    <EditBlogContext.Provider value={state}>
      {children}
    </EditBlogContext.Provider>
  );
};

export const useHandleEditBlogContext = () => {
  return useContext(EditBlogContext);
};
