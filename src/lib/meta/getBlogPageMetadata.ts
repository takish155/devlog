import { prisma } from "@/../prisma/prisma";
import { Metadata } from "next";

export default async function getBlogPageMetadata(
  blogId: string
): Promise<Metadata> {
  console.log(blogId);
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!blog) {
    return {
      title: "404 Not Found | Devlog",
      robots: "noindex.nofollow",
    };
  }

  const images = blog.thumbnail ? [{ url: blog.thumbnail }] : undefined;

  return {
    title: `${blog.title} | Devlog`,
    description: blog.description,
    openGraph: {
      title: `${blog.title} | Devlog`,
      description: blog.description,
      type: "article",
      images,
    },
  };
}
