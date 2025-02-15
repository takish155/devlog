import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/global/header/Header";
import QueryProvider from "@/contexts/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "@/contexts/SessionProvider";

const englishFont = Poppins({
  variable: "--font-english",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const japaneseFont = Noto_Sans({
  variable: "--font-japanese",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "DevLog",
  description: "",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messageRequest = getMessages();
  const sessionRequest = auth();

  const [messages, session] = await Promise.all([
    messageRequest,
    sessionRequest,
  ]);

  return (
    <html lang={locale}>
      <body
        className={`${englishFont.variable} ${
          japaneseFont.variable
        } antialiased ${locale === "ja" ? "font-japanese" : "font-english"}`}
      >
        <QueryProvider>
          <SessionProvider session={session}>
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Toaster />
            </NextIntlClientProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
