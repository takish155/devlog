"use server";

import { signOut as handleSignOut, auth } from "@/auth";
import { getTranslations } from "next-intl/server";

export default async function signOut() {
  try {
    const translation = getTranslations("SignInPage");
    const sessionRequest = auth();

    const [t, session] = await Promise.all([translation, sessionRequest]);

    if (!session) {
      return {
        success: false,
        message: t("errors.notSignedIn"),
        status: 401,
      };
    }

    await handleSignOut({
      redirect: false,
    });

    return {
      success: true,
      message: t("signOut.description"),
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Internal server error!",
      status: 500,
    };
  }
}
