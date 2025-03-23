import React from "react";
import BlogPageHeader from "./BlogPageHeader";
import Markdown from "../ui/markdown";
import Image from "next/image";
import { GetBlogByIdType } from "@/lib/fetcher/getBlogById";

const BlogContentSection = ({
  data,
  blogId,
}: {
  data: GetBlogByIdType;
  blogId: string;
}) => {
  return (
    <article className="w-[65%] max-lg:w-full">
      <BlogPageHeader data={data} blogId={blogId} />
      {/* Blog Content */}
      <div className="mb-20">
        {data?.thumbnail && (
          <Image
            src={data?.thumbnail}
            width={100}
            height={100}
            className="w-full mb-4 my-auto"
            alt={`Thumbnail for ${data?.title}`}
          />
        )}
        <Markdown>{data?.content ?? ""}</Markdown>
      </div>
    </article>
  );
};

export default BlogContentSection;
