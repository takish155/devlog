"use server";

import { signIn as handleSignIn } from "@/auth";
import { signInSchema, SignInSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";

export default async function signIn(data: SignInSchema) {
  try {
    const t = await getTranslations("SignInPage");

    const safeData = signInSchema.safeParse(data);
    if (!safeData.success) {
      return {
        success: false,
        message: t("errors.invalidRequestBody"),
        status: 400,
      };
    }

    // Attemp authentication
    try {
      await handleSignIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: t("errors.invalidCredentials"),
          status: 400,
        };
      }

      throw new Error(error as any);
    }

    return {
      success: true,
      message: t("success.description"),
      status: 200,
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: "Internal server error!",
      status: 500,
    };
  }
}
