import { HeaderBlogPageType } from "@/lib/fetcher/getBlogById";
import React from "react";
import AuthorInfoCard from "../users/AuthorInfoCard";
import BlogActions from "./blog-actions/BlogActions";
import { Separator } from "../ui/separator";

const BlogPageHeader = ({
  data,
  blogId,
}: {
  data: HeaderBlogPageType;
  blogId: string;
}) => {
  return (
    <div>
      {/* Title / Description */}
      <div className="mb-5">
        <h2 className="font-bold text-black text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-xl">
          {data?.title}
        </h2>
        <p>{data?.description}</p>
      </div>

      {/* Author & Info */}
      <AuthorInfoCard
        displayName={data?.author.displayName ?? ""}
        image={data?.author.image ?? ""}
        username={data?.author.username ?? ""}
        createdAt={data?.createdAt}
        updatedAt={data?.updatedAt}
        showUpdate
      />

      {/* Actions */}
      <BlogActions blogId={blogId} authorId={data?.author.id as string} />
      <Separator className="mb-10 mt-3" />
    </div>
  );
};

export default BlogPageHeader;
