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
import Footer from "@/components/Footer";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const paramRequest = params;
  const messageRequest = getMessages();

  const [messages, { locale }] = await Promise.all([
    messageRequest,
    paramRequest,
  ]);
  // todo: fix not found pages
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${englishFont.variable} ${
          japaneseFont.variable
        } antialiased ${locale === "ja" ? "font-japanese" : "font-english"}`}
      >
        <QueryProvider>
          <SessionProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </NextIntlClientProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
