"use client";

import { useSession } from "@/contexts/SessionProvider";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const UserActionSection = ({ userId }: { userId: string }) => {
  const t = useTranslations("UserPage");
  const session = useSession();

  if (session && session.user?.id == userId) {
    return (
      <div>
        <Button></Button>
      </div>
    );
  }
  return <div>UserActionSection</div>;
};

export default UserActionSection;
