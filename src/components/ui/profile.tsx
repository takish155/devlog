import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Profile = ({
  children = "?",
  src = "",
}: {
  children?: string;
  src: string;
}) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default Profile;
