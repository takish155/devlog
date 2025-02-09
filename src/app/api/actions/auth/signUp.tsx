"use server";

import { auth, signIn } from "@/auth";
import { redirect } from "@/i18n/routing";
import { signUpSchema, SignUpSchema } from "@/schemas/auth.schema";
import { getLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/../prisma/prisma";
import bcrypt from "bcryptjs";

export default async function signUp(data: SignUpSchema) {
  try {
    const sessionRequest = auth();
    const localeRequest = getLocale();
    const translation = getTranslations("SignUpPage");

    const [session, locale, t] = await Promise.all([
      sessionRequest,
      localeRequest,
      translation,
    ]);

    if (session) {
      redirect({
        href: "/",
        locale,
      });
    }

    const isSafe = signUpSchema.safeParse(data);
    if (!isSafe.success) {
      return {
        success: false,
        status: 400,
        message: t("errors.invalidData"),
      };
    }

    const usernameExists = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (usernameExists) {
      return {
        success: false,
        status: 400,
        message: t("errors.usernameExists"),
      };
    }

    const emailExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (emailExists) {
      return {
        success: false,
        status: 400,
        message: t("errors.emailExists"),
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    return {
      success: true,
      status: 200,
      message: t("success.description"),
      user,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
}
