import { auth } from "@/auth";
import PreviewBlogTab from "@/components/blogs/PreviewBlogTab";
import BlogForm from "@/components/forms/blog/BlogForm";
import Main from "@/components/ui/main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditBlogProvider,
  useHandleEditBlogContext,
} from "@/contexts/EditBlogContext";
import { redirect } from "@/i18n/routing";
import getBlogById from "@/lib/fetcher/getBlogById";
import { getTranslations } from "next-intl/server";
import React from "react";

const EditBlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string; locale: string }>;
}) => {
  const { blogId, locale } = await params;

  const blogRequest = getBlogById(blogId);
  const sessionRequest = auth();
  const translation = getTranslations("EditBlogPage");

  const [blog, session, t] = await Promise.all([
    blogRequest,
    sessionRequest,
    translation,
  ]);

  if (blog?.author.id !== session?.user!.id) {
    redirect({
      href: `/${locale}/blogs/${blogId}`,
      locale,
    });
  }

  return (
    <Main>
      <h2>{t("title")}</h2>
      <EditBlogProvider>
        <Tabs defaultValue="editor" className="w-full sticky top-10">
          <TabsList>
            <TabsTrigger value="editor">{t("editor")}</TabsTrigger>
            <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <BlogForm
              context={useHandleEditBlogContext}
              buttonPlaceholder={t("update")}
              defaultValue={{
                title: blog?.title ?? "",
                description: blog?.description ?? "",
                content: blog?.content ?? "",
              }}
            />
          </TabsContent>
          <TabsContent value="preview">
            <PreviewBlogTab context={useHandleEditBlogContext} />
          </TabsContent>
        </Tabs>
      </EditBlogProvider>
    </Main>
  );
};

export default EditBlogPage;
