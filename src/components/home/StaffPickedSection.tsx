import { StaffPickedBlog } from "@/lib/fetcher/blogs/getStaffPickedBlogs";
import { useTranslations } from "next-intl";
import React from "react";
import BlogCard from "../blogs/BlogCard";

const StaffPickedSection = ({
  staffPickedBlog,
}: {
  staffPickedBlog: StaffPickedBlog;
}) => {
  const t = useTranslations("HomePage.staffPicked");

  return (
    <div className="w-[40%] max-lg:hidden">
      <section className="w-full flex sticky top-[7rem]">
        <div>
          <h2 className="font-bold text-black text-xl mb-5">{t("title")}</h2>
          {staffPickedBlog.map((blog) => (
            <BlogCard key={blog.blog.id} data={blog.blog} removeThumbnail />
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffPickedSection;
