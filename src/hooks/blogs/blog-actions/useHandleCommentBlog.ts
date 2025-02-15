import commentBlog from "@/app/api/actions/blogs/commentBlog";
import {
  blogCommentSchema,
  BlogCommentType,
} from "@/schemas/blogComment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

const useHandleCommentBlog = (blogId: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<BlogCommentType>({
    resolver: zodResolver(blogCommentSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BlogCommentType, parentCommentId?: string) =>
      commentBlog(data, blogId, parentCommentId),
  });

  // todo: add these to form, add a mechanic where when user submits a comment,
  // it will be added to the list of comments without refreshing the page

  return {
    register,
    errors,
    isPending,
    mutate,
    reset,
    handleSubmit,
  };
};

export default useHandleCommentBlog;
