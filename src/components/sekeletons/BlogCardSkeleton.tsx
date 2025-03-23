import React from "react";
import { Skeleton } from "../ui/skeleton";

interface BlogCardSkeletonProps {
  takeFullWidth?: boolean;
}

const BlogCardSkeleton = ({ takeFullWidth = false }: BlogCardSkeletonProps) => {
  if (takeFullWidth) {
    return (
      <div className="w-full">
        <Skeleton className="w-full mb-10 h-[10rem]" />
        <Skeleton className="w-full mb-10 h-[10rem]" />
        <Skeleton className="w-full mb-10 h-[10rem]" />
      </div>
    );
  }

  return (
    <div className="w-[55%] max-lg:w-full">
      <Skeleton className="w-full mb-10 h-[10rem]" />
      <Skeleton className="w-full mb-10 h-[10rem]" />
      <Skeleton className="w-full mb-10 h-[10rem]" />
    </div>
  );
};

export default BlogCardSkeleton;
