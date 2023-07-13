import type { NextRequest } from "next/server";

import { i18n } from "i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import createMiddleware from "./middleware/middleware";

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
