import React from "react";
import OrderBySection from "./OrderBySection";
import BlogCard from "../blogs/BlogCard";
import MoreBlogSection from "./MoreBlogSection";
import getHomeFirstTenBlogs from "@/lib/fetcher/getHomeFirstTenBlogs";

const BlogSection = async ({ orderBy }: { orderBy: string }) => {
  const res = await getHomeFirstTenBlogs(orderBy as any);

  return (
    <section className="w-[55%] max-lg:w-full">
      <OrderBySection />
      {res.blogs.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
      {res.blogs.length === 10 && (
        <MoreBlogSection initialCursor={res.blogs[res.blogs.length - 1].id} />
      )}
    </section>
  );
};

export default BlogSection;
