import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Profile = ({
  children = "?",
  src = "",
  size = "sm",
}: {
  children?: string;
  src?: string;
  size?: "lg" | "sm";
}) => {
  const sizeClassname = size === "lg" ? `h-20 w-20` : "";

  return (
    <Avatar className={`${sizeClassname}`}>
      <AvatarImage src={src} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default Profile;
