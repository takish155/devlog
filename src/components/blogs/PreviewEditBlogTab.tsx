"use client";

import React from "react";
import Markdown from "../ui/markdown";
import { useHandleEditBlogContext } from "@/contexts/EditBlogContext";

const PreviewEditBlogTab = () => {
  const { watch } = useHandleEditBlogContext()!;

  const content = watch("content");

  return <Markdown>{content}</Markdown>;
};

export default PreviewEditBlogTab;
