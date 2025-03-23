import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const OrderBySection = () => {
  const t = useTranslations("HomePage.orderBy");

  const orderBy = [
    { label: t("likes"), value: "likes" },
    { label: t("comments"), value: "comments" },
    { label: t("newest"), value: "newest" },
    { label: t("oldest"), value: "oldest" },
  ];

  return (
    <Card className="flex gap-2 justify-center mx-auto w-[95%] max-w-[800px] mb-5 sticky top-[6.5rem] z-50">
      {orderBy.map((order) => (
        <Link href={`?orderBy=${order.value}`} key={order.value}>
          <Button className="text-muted-foreground" variant={"link"}>
            {order.label}
          </Button>
        </Link>
      ))}
    </Card>
  );
};

export default OrderBySection;
