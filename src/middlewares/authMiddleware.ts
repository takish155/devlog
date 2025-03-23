import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { MiddlewareResponse } from "./handleMiddleware";

export default async function authMiddleware(
  data?: any,
  passedData?: any
): Promise<MiddlewareResponse> {
  const session = await auth();

  if (!session) {
    const t = await getTranslations("ServerErrors");

    return {
      pass: false,
      message: t("notAuthenticated"),
      data: "",
      status: 401,
    };
  }

  return { pass: true, data: session };
}
