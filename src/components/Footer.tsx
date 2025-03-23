import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="pb-10 mt-32 text-muted-foreground">
      <Separator className="mb-10" />
      <p className="text-center mb-1">
        {t.rich("madeWithLove", {
          link: (chunk) => (
            <Link
              className="text-primary underline"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://takish155.com/${locale}/`}
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
      <p className="text-center text-sm">©2024 Devlog, all rights reserve</p>
    </footer>
  );
};

export default Footer;
