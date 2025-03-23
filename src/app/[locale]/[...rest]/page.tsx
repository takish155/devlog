import ErrorSection from "@/components/ErrorSection";
import Main from "@/components/ui/main";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Error from "next/error";

export const metadata: Metadata = {
  title: "404 Not Found | DevLog",
  robots: "noindex.nofollow",
};

export default function CatchAllPage() {
  const t = useTranslations("ServerErrors.404");

  return (
    <Main className="text-center">
      <ErrorSection
        title={t("title")}
        description={t("description")}
        errorCode={404}
      />
    </Main>
  );
}
