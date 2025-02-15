import { Link } from "@/i18n/routing";
import React from "react";
import { Separator } from "@/components/ui/separator";
import GuestNav from "./GuestNav";
import { SearchInput } from "./SearchInput";
import MobileSearch from "./mobile/MobileSearch";
import UserNav from "./user/UserNav";
import Nav from "./Nav";

const Header = async () => {
  return (
    <header className="top-0 sticky z-50 mb-6 bg-background">
      <div className="w-[95%] mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="font-bold text-2xl max-lg:text-xl max-sma:text-lg">
            <Link href="/">
              <span className="text-primary">Dev</span>log
            </Link>
          </h1>
          <div className="max-lg:hidden">
            <SearchInput />
          </div>
        </div>
        <nav className="flex gap-2">
          <MobileSearch />
          <Nav />
        </nav>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
