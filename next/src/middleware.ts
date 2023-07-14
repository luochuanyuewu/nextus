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
