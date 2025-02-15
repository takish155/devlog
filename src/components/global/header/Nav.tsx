"use client";

import { useSession } from "@/contexts/SessionProvider";
import React from "react";
import UserNav from "./user/UserNav";
import GuestNav from "./GuestNav";

const Nav = () => {
  const session = useSession();

  return <>{session ? <UserNav session={session} /> : <GuestNav />}</>;
};

export default Nav;
