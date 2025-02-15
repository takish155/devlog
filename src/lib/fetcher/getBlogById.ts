import { prisma } from "@/../prisma/prisma";

export default async function getBlogById(blogId: string) {
  const data = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          displayName: true,
          image: true,
          username: true,
          id: true,
        },
      },
    },
  });

  return data;
}
