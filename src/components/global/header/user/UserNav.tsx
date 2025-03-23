import React from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { Session } from "next-auth";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const UserNav = ({ session }: { session: Session }) => {
  const t = useTranslations("Header");

  return (
    <div className="flex gap-2 items-center">
      <Link href={"/blogs/create"}>
        <Button size={"sm"} className="max-sm:hidden">
          {t("createBlog")}
        </Button>
      </Link>
      <ProfileDropdownMenu session={session} />
    </div>
  );
};

export default UserNav;
