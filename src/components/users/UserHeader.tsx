import React from "react";
import { Separator } from "../ui/separator";

interface UserHeaderProps {
  displayName: string;
}

const UserHeader = ({ displayName }: UserHeaderProps) => {
  return (
    <section className="mb-6">
      <h2 className="text-black text-3xl font-semibold mb-6">{displayName}</h2>
      <Separator />
    </section>
  );
};

export default UserHeader;
