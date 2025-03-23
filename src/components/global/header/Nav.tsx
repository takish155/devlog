"use client";

import { useSession } from "@/contexts/SessionProvider";
import React from "react";
import UserNav from "./user/UserNav";
import GuestNav from "./GuestNav";
import MobileSearch from "./mobile/MobileSearch";
import Spinner from "@/components/ui/spinner";

const Nav = () => {
  const { session, isLoading } = useSession()!;

  if (isLoading) return <Spinner />;

  return (
    <nav className="flex gap-2 items-center">
      <MobileSearch />
      {session ? <UserNav session={session} /> : <GuestNav />}
    </nav>
  );
};

export default Nav;
