import { Skeleton } from "@/components/ui/skeleton";

const AuthorOtherBlogSectionSkeleton = () => {
  return (
    <div className="w-[30%] max-lg:hidden">
      <div className="mt-[13rem] sticky top-[7rem]">
        <Skeleton className="w-full mb-10 h-[7rem]" />
        <Skeleton className="w-full mb-10 h-[7rem]" />
        <Skeleton className="w-full mb-10 h-[7rem]" />
      </div>
    </div>
  );
};

export default AuthorOtherBlogSectionSkeleton;
