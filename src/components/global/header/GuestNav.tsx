import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const GuestNav = () => {
  const t = useTranslations("Header");

  return (
    <div className="flex gap-2">
      <Link href={"/auth/sign-in"}>
        <Button size={"sm"} variant={"outline"}>
          {t("signIn")}
        </Button>
      </Link>
      <Link href={"/auth/sign-up"}>
        <Button size={"sm"}>{t("signUp")}</Button>
      </Link>
    </div>
  );
};

export default GuestNav;
