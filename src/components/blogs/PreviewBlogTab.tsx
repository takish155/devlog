"use client";

import { useHandleCreateBlogContext } from "@/contexts/CreateBlogContext";
import React from "react";
import Markdown from "../ui/markdown";

const PreviewBlogTab = () => {
  const { watch } = useHandleCreateBlogContext()!;

  const content = watch("content");

  return <Markdown>{content}</Markdown>;
};

export default PreviewBlogTab;
