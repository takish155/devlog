import SignUpForm from "@/components/forms/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Main from "@/components/ui/main";
import { useTranslations } from "next-intl";
import React from "react";

const SignUpPage = () => {
  const t = useTranslations("SignUpPage");

  return (
    <Main>
      <Card className="my-20 py-5 w-full max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </Main>
  );
};

export default SignUpPage;
