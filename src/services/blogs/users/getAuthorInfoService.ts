import { prisma } from "@/../prisma/prisma";
import { routing } from "@/i18n/routing";
import { revalidateTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function getUserInfoService(username: string) {
  "use cache";
  cacheLife("max");
  cacheTag(`/users/${username}`);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      image: true,
      createdAt: true,
      bio: true,
    },
  });

  return user;
}

export const generateUserStaticParams = async () => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return users.map((user) => ({
    username: user.username,
  }));
};

export const revalidateUserInfo = async (username: string) => {
  revalidateTag(`/users/${username}`);
  const locales = routing.locales;

  locales.forEach((locale) => {
    revalidateTag(`/${locale}/users/${username}`);
  });
};

export type GetAuthorInfoService = NonNullable<
  Awaited<ReturnType<typeof getUserInfoService>>
>;
