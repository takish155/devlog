import React from "react";
import Profile from "../ui/profile";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface AuthorInfoCardProps {
  image: string | null;
  displayName: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  showUpdate?: boolean;
}

const AuthorInfoCard = ({
  displayName,
  image,
  username,
  createdAt,
  updatedAt,
  showUpdate = false,
}: AuthorInfoCardProps) => {
  const t = useTranslations("BlogPage");

  return (
    <div className="flex gap-3 mb-3 items-center">
      <Profile src={image ?? ""} />
      <div className="text-sm">
        <p className="font-bold">
          <Link href={`/users/${username}`}>{displayName}</Link>
        </p>
        {createdAt && (
          <p>
            {createdAt.toLocaleString()}{" "}
            {showUpdate && updatedAt && (
              <span>
                (
                {t("updatedAt", {
                  date: updatedAt.toLocaleDateString(),
                })}
                )
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorInfoCard;
