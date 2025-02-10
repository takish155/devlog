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
import { signOut } from "next-auth/react";

const ProfileDropdownMenu = ({ session }: { session: Session }) => {
  const t = useTranslations("Header");

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
        <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
        <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => signOut()}>
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
