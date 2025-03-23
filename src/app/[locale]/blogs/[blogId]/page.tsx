import Main from "@/components/ui/main";
import React, { Suspense } from "react";
import getBlogById from "@/lib/fetcher/getBlogById";
import BlogContentSection from "@/components/blogs/BlogContentSection";
import AuthorOtherBlogSection from "@/components/blogs/AuthorOtherBlogSection";
import { prisma } from "../../../../../prisma/prisma";
import AuthorOtherBlogSectionSkeleton from "@/components/sekeletons/blogs/AuthorOtherBlogSectionSkeleton";
import getBlogPageMetadata from "@/lib/meta/getBlogPageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  const meta = await getBlogPageMetadata(blogId);

  return meta;
}
export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
    },
  });

  return blogs.map((blog) => ({
    blogId: blog.id,
  }));
}

export const experimental_ppr = true;

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const data = await getBlogById(blogId);

  if (!data) return null;

  return (
    <Main className="flex max-w-[1000px] justify-center gap-[5%]">
      <BlogContentSection data={data} blogId={blogId} />
      <Suspense fallback={<AuthorOtherBlogSectionSkeleton />}>
        <AuthorOtherBlogSection
          blogId={blogId}
          authorId={data.author.id}
          displayname={data.author.displayName}
        />
      </Suspense>
    </Main>
  );
};

export default BlogPage;
