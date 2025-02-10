import React from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { Session } from "next-auth";

const UserNav = ({ session }: { session: Session }) => {
  return (
    <div className="flex gap-2">
      <ProfileDropdownMenu session={session} />
    </div>
  );
};

export default UserNav;
