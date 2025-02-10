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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import useHandleSignOut from "@/hooks/auth/useHandleSignOut";
import { Link } from "@/i18n/routing";

const ProfileDropdownMenu = ({ session }: { session: Session }) => {
  const t = useTranslations("Header");
  const { isPending, mutate } = useHandleSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="pointer">
        <Avatar>
          <AvatarImage src={session.user?.image ?? ""} />
          <AvatarFallback>? </AvatarFallback>
        </Avatar>
        <p className="sr-only">{t("toggleMenu")}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
