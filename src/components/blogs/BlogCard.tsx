import { BlogCardProps } from "@/lib/fetcher/getHomeBlogs";
import React from "react";
import Profile from "../ui/profile";
import { MessageCircleIcon, PencilIcon, ThumbsUpIcon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import noImage from "@/../public/images/no-image.png";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const BlogCard = ({
  data,
  clickable = true,
}: {
  data: BlogCardProps;
  clickable?: boolean;
}) => {
  const t = useTranslations("BlogPage.preview");

  if (!clickable) {
    return (
      <section className="w-full max-w-[800px] mx-auto flex justify-between items-center gap-[10%]">
        <div className="w-[60%]">
          <div className="flex gap-2 items-center mb-3 text-sm">
            <Profile src={data.author.image ?? ""} />
            <p>{data.author.displayName}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-black">
              {data.title ? data.title : t("noTitle")}
            </h3>
            <p>{data.description ? data.description : t("noDescription")}</p>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <p className="flex gap-1 items-center">
              <PencilIcon size={16} />
              {data.createdAt.toLocaleDateString()}
            </p>
            <p className="flex gap-1 items-center">
              <ThumbsUpIcon size={16} /> {data.likeCount}
            </p>
            <p className="flex gap-1 items-center">
              <MessageCircleIcon size={16} />
              {data.commentCount}
            </p>
          </div>
        </div>
        <div className="w-[20%]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={data.thumbnail ?? noImage}
              alt="Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </section>
    );
  }

  return (
    <Link
      href={`/blogs/${data.id}`}
      className="w-full block max-w-[800px] mx-auto"
    >
      <section className="w-full flex justify-between items-center gap-[10%]">
        <div className="w-[60%]">
          <div className="flex gap-2 items-center mb-3 text-sm">
            <Profile src={data.author.image ?? ""} />
            <p>{data.author.displayName}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-black">{data.title}</h3>
            <p>{data.description}</p>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <p className="flex gap-1 items-center">
              <PencilIcon size={16} />
              {data.createdAt.toLocaleDateString()}
            </p>
            <p className="flex gap-1 items-center">
              <ThumbsUpIcon size={16} /> {data.likeCount}
            </p>
            <p className="flex gap-1 items-center">
              <MessageCircleIcon size={16} />
              {data.commentCount}
            </p>
          </div>
        </div>
        <div className="w-[20%]">
          <Image
            src={data.thumbnail ?? noImage}
            alt="Image"
            className="rounded-md object-cover"
          />
        </div>
      </section>
    </Link>
  );
};

export default BlogCard;
