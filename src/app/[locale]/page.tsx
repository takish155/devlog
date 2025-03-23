import BlogSection from "@/components/home/BlogSection";
import StaffPickedSection from "@/components/home/StaffPickedSection";
import BlogCardSkeleton from "@/components/sekeletons/BlogCardSkeleton";
import Main from "@/components/ui/main";
import getStaffPickedBlogs from "@/lib/fetcher/blogs/getStaffPickedBlogs";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [staffPickedBlog, { orderBy }] = await Promise.all([
    getStaffPickedBlogs(),
    searchParams,
  ]);

  return (
    <Main className="flex justify-center gap-[5%] max-w-[1000px]">
      {/* None cached data */}
      <Suspense fallback={<BlogCardSkeleton />}>
        <BlogSection orderBy={orderBy as string} />
      </Suspense>
      {/* Cached data */}
      <StaffPickedSection staffPickedBlog={staffPickedBlog} />
    </Main>
  );
};

export default HomePage;
