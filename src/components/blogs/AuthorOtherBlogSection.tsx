import getAuthorPopularBlog from "@/lib/fetcher/blogs/getAuthorPopularBlog";
import { getTranslations } from "next-intl/server";
import React from "react";
import BlogCard from "./BlogCard";

interface AuthorOtherBlogSectionProps {
  displayname: string;
  authorId: string;
  blogId: string;
}

const AuthorOtherBlogSection = async ({
  blogId,
  authorId,
  displayname,
}: AuthorOtherBlogSectionProps) => {
  const translation = getTranslations("BlogPage");
  const data = getAuthorPopularBlog(authorId, blogId);

  const [t, blogs] = await Promise.all([translation, data]);

  return (
    <section className="w-[30%] max-lg:hidden">
      <div className="mt-[13rem] sticky top-[7rem]">
        <h2 className="font-bold text-black text-xl mb-5">
          {t("otherBlogsFrom", {
            name: displayname,
          })}
        </h2>
        {blogs.length === 0 ? (
          <p className="text-sm">
            {t("noOtherBlogs", {
              name: displayname,
            })}
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogCard key={blog.id} data={blog} removeThumbnail />
          ))
        )}
      </div>
    </section>
  );
};

export default AuthorOtherBlogSection;
