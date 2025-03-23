import React from "react";
import Profile from "../ui/profile";
import { MessageCircleIcon, PencilIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import noImage from "@/../public/images/no-image.png";
import { Link } from "@/i18n/routing";
import { Separator } from "../ui/separator";
import { BlogCardProps as BlogCardType } from "@/types/blogs.types";

interface BlogCardProps {
  data: BlogCardType;
  clickable?: boolean;
  removeThumbnail?: boolean;
}

const BlogCard = ({
  data,
  clickable = true,
  removeThumbnail = false,
}: BlogCardProps) => {
  if (!clickable) {
    return (
      <div className="w-full block max-w-[800px] mx-auto">
        <BlogCardSection data={data} removeThumbnail={removeThumbnail} />
      </div>
    );
  }

  return (
    <Link
      href={`/blogs/${data.id}`}
      className="w-full block max-w-[800px] mx-auto"
    >
      <BlogCardSection data={data} removeThumbnail={removeThumbnail} />
    </Link>
  );
};

const BlogCardSection = ({
  data,
  removeThumbnail,
}: {
  data: BlogCardType;
  removeThumbnail: boolean;
}) => {
  const imageUrl =
    !data.thumbnail || data.thumbnail?.length == 0 ? noImage : data.thumbnail;

  const createdAt = new Date(data.createdAt);

  return (
    <>
      <section className="w-full flex justify-between items-center gap-[10%] mb-10">
        <div className={`${removeThumbnail ? "w-full" : "w-[60%]"}`}>
          <div className="flex gap-2 items-center mb-3 text-sm">
            <Profile src={data.author.image ?? ""} />
            <p className="text-xs">{data.author.displayName}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">{data.title}</h3>
            <p className="text-sm">{data.description}</p>
          </div>
          {!removeThumbnail && (
            <div className="flex items-center gap-5 text-xs">
              <p className="flex gap-1 items-center">
                <PencilIcon size={16} />
                {createdAt.toLocaleDateString()}
              </p>
              <p className="flex gap-1 items-center">
                <ThumbsUpIcon size={16} /> {data.likeCount}
              </p>
              <p className="flex gap-1 items-center">
                <MessageCircleIcon size={16} />
                {data.commentCount}
              </p>
            </div>
          )}
        </div>
        <div className={`w-[20%] ${removeThumbnail ? "hidden" : ""}`}>
          <Image
            width={"100"}
            height={"100"}
            src={imageUrl}
            alt="Image"
            className="rounded-md object-cover"
          />
        </div>
      </section>
      {!removeThumbnail && <Separator className="my-8" />}
    </>
  );
};

export default BlogCard;
