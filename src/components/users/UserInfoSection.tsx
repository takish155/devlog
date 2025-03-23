import React from "react";
import Profile from "../ui/profile";
import { useTranslations } from "next-intl";
import { GetAuthorInfoService } from "@/services/blogs/users/getAuthorInfoService";

const UserInfoSection = ({
  bio,
  createdAt,
  displayName,
  image,
  username,
}: GetAuthorInfoService) => {
  const t = useTranslations("UserPage");
  return (
    <section className="w-[30%] text-sm mb-5">
      <Profile src={image!} size="lg" />
      <h3 className="mt-2 font-bold text-black text-xl">{displayName}</h3>
      <h2>@{username}</h2>
      <p className="mb-5">
        {t("joinedAt", {
          date: createdAt.toLocaleDateString(),
        })}
      </p>
      {!bio && (
        <div className="mb-5">
          <h3 className="font-bold text-black">Bio</h3>
          <p>{bio ?? "Founder of Devlog, Hello to myself and the world!"}</p>
        </div>
      )}
    </section>
  );
};

export default UserInfoSection;
