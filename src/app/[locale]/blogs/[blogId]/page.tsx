import Main from "@/components/ui/main";
import React from "react";
import Markdown from "@/components/ui/markdown";
import getBlogById from "@/lib/fetcher/getBlogById";
import Profile from "@/components/ui/profile";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const data = await getBlogById(blogId);

  return (
    <Main className="max-w-[1000px]">
      <section>
        {/* Title / Description */}
        <div className="mb-5">
          <h2 className="font-bold text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-xl">
            {data?.title}
          </h2>
          <p>{data?.description}</p>
        </div>

        {/* Author & Info */}
        <div className="flex gap-3 mb-3 items-center">
          <Profile src={data?.author.image ?? ""} />
          <div className="text-xs">
            <p className="font-bold">
              <Link href={`/users/${data?.author.username}`}>
                {data?.author.displayName}
              </Link>
            </p>
            <p>
              {data?.createdAt.toLocaleString()}{" "}
              {data?.updatedAt && <span>{}</span>}
            </p>
          </div>
        </div>
      </section>
      <Separator className="mb-10" />
      <Markdown>{data?.content ?? ""}</Markdown>
    </Main>
  );
};

export default BlogPage;
