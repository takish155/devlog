import Main from "@/components/ui/main";
import { useTranslations } from "next-intl";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreateBlogProvider,
  useHandleCreateBlogContext,
} from "@/contexts/CreateBlogContext";
import PreviewBlogTab from "@/components/blogs/PreviewBlogTab";
import BlogForm from "@/components/forms/blog/BlogForm";

const CreateBlogPage = () => {
  const t = useTranslations("CreateBlogPage");

  return (
    <Main>
      <h2 className="mb-5">{t("title")}</h2>
      <CreateBlogProvider>
        <Tabs defaultValue="editor" className="w-full sticky top-10">
          <TabsList>
            <TabsTrigger value="editor">{t("editor")}</TabsTrigger>
            <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <BlogForm
              context={useHandleCreateBlogContext}
              buttonPlaceholder={t("form.submit")}
            />
          </TabsContent>
          <TabsContent value="preview">
            <PreviewBlogTab context={useHandleCreateBlogContext} />
          </TabsContent>
        </Tabs>
      </CreateBlogProvider>
    </Main>
  );
};

export default CreateBlogPage;
