import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";
import React from "react";
import { SearchInput } from "../SearchInput";

const MobileSearch = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button variant={"outline"} size={"icon"}>
          <SearchIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"top"} className="pt-10">
        <SearchInput />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearch;
