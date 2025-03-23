import useFetchMoreBlog from "@/hooks/useFetchMoreBlog";
import React from "react";
import BlogCard from "../blogs/BlogCard";

export interface MoreBlogsProps {
  initialCursor: string;
}

const MoreBlogs = ({ initialCursor }: MoreBlogsProps) => {
  const { data, hasNextPage, isFetching, ref } =
    useFetchMoreBlog(initialCursor);

  if (!data || !data.pages) return null;

  return (
    <section>
      {data?.pages.map((page, index) => {
        return (
          <div key={index}>
            {page?.map((blog) => (
              <BlogCard key={blog.id} data={blog} />
            ))}
          </div>
        );
      })}
      {hasNextPage && !isFetching && <div ref={ref}></div>}
    </section>
  );
};

export default MoreBlogs;
