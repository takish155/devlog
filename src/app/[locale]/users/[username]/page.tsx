import BlogCardSkeleton from "@/components/sekeletons/BlogCardSkeleton";
import Main from "@/components/ui/main";
import { Separator } from "@/components/ui/separator";
import UserBlogSection from "@/components/users/UserBlogSection";
import UserHeader from "@/components/users/UserHeader";
import UserInfoSection from "@/components/users/UserInfoSection";
import getUserInfoService, {
  generateUserStaticParams,
} from "@/services/blogs/users/getAuthorInfoService";
import React, { Suspense } from "react";

export async function generateStaticParams() {
  const users = await generateUserStaticParams();

  return users;
}

export const experimental_ppr = true;

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const user = await getUserInfoService(username);

  if (!user) return null;

  return (
    <Main className="max-w-[1000px] flex justify-center gap-[2%] flex-wrap">
      <div className="w-[65%]">
        <UserHeader displayName={user.displayName} />
        <Suspense fallback={<BlogCardSkeleton takeFullWidth />}>
          <UserBlogSection userId={user.id} />
        </Suspense>
      </div>
      <div>
        <Separator orientation="vertical" />
      </div>

      <UserInfoSection
        displayName={user.displayName}
        username={user.username}
        createdAt={user.createdAt}
        bio={user.bio}
        image={user.image}
      />
    </Main>
  );
};

export default UserPage;

// todo: make follow system
