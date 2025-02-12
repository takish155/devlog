import BlogCard from "@/components/blogs/BlogCard";
import Main from "@/components/ui/main";
import { Separator } from "@/components/ui/separator";
import getHomeBlogs from "@/lib/fetcher/getHomeBlogs";
import React from "react";

const HomePage = async () => {
  const blogs = await getHomeBlogs();

  return (
    <Main>
      {blogs.map((data) => (
        <>
          <BlogCard key={data.id} data={data} />
          <Separator className="my-8 max-w-[800px] mx-auto" />
        </>
      ))}
    </Main>
  );
};

export default HomePage;
