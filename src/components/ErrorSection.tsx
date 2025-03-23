import { Link } from "@/i18n/routing";
import React from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

interface ErrorSectionProps {
  title: string;
  description: string;
  errorCode: number | string;
}

const ErrorSection = ({ description, errorCode, title }: ErrorSectionProps) => {
  const t = useTranslations("ServerErrors");
  return (
    <section>
      <h2 className="mt-36 text-3xl mb-1 font-extrabold text-black">
        {errorCode}: {title}
      </h2>
      <p className="mb-5">{description}</p>
      <Link href="/">
        <Button size={"sm"}>{t("homePage")}</Button>
      </Link>
    </section>
  );
};

export default ErrorSection;
