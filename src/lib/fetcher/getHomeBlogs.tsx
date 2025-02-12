import { prisma } from "@/../prisma/prisma";

export default async function getHomeBlogs() {
  const blogs = await prisma.blog.findMany({
    take: 5,
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      createdAt: true,
      likeCount: true,
      commentCount: true,
      author: {
        select: {
          username: true,
          displayName: true,
          image: true,
        },
      },
    },
  });

  return blogs;
}

export type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
  likeCount: number;
  commentCount: number;
  author: {
    username: string;
    displayName: string;
    image: string | null;
  };
};
