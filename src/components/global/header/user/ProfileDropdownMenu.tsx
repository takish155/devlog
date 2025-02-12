"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import useHandleSignOut from "@/hooks/auth/useHandleSignOut";
import { Link } from "@/i18n/routing";
import Profile from "@/components/ui/profile";

const ProfileDropdownMenu = ({ session }: { session: Session }) => {
  const t = useTranslations("Header");
  const { isPending, mutate } = useHandleSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="pointer">
        <Profile src={session.user?.image ?? ""} />
        <p className="sr-only">{t("toggleMenu")}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="px-5">
          {t("greeting", { name: session.user.username })}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/blogs/create">{t("createBlog")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/users/${session.user.username}`}>{t("profile")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">{t("settings")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          className="text-red-500"
          onClick={() => mutate()}
        >
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
