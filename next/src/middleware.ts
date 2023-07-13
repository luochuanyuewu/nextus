import type { NextRequest } from "next/server";

import { i18n } from "i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import createMiddleware from "./middleware/middleware";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "zh"],
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "zh",

  localeDetection: true,

  alternateLinks: true,
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!_next).*)"],
};
