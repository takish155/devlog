import SignInForm from "@/components/forms/auth/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Main from "@/components/ui/main";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const SignInPage = () => {
  const t = useTranslations("SignInPage");

  return (
    <Main>
      <Card className="my-20 w-full py-7 sm:px-5 max-w-[500px] mx-auto rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground mx-auto">
            {t.rich("noAccount", {
              link: (chunk) => (
                <Link className="font-bold" href="/auth/sign-up">
                  {chunk}
                </Link>
              ),
            })}
          </p>
        </CardFooter>
      </Card>
    </Main>
  );
};

export default SignInPage;
