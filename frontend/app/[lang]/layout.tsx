import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { i18n } from "@/i18n-config";
import { Analytics } from "@/components/analytics";

const FALLBACK_SEO = {
  title: "Strapi Starter Next Blog",
  description: "Strapi Starter Next Blog",
}


async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.buttons",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {



  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer, theme } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer ? footer.footerLogo.logoImg.data.attributes.url : ''
  );

  // <html lang={params.lang} data-theme={theme ? theme : "light"}>

  return (
    <html lang={params.lang} >
      <body >

        {navbar && <Navbar
          links={navbar.links}
          buttons={navbar.buttons}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />}


        <main className="mx-auto max-w-7xl mb-5">
          {children}
        </main>

        {notificationBanner && <Banner data={notificationBanner} />}

        {footer && <Footer

          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuTitle={footer.menuTitle}
          menuLinks={footer.menuLinks}
          categoryTitle={footer.categoryTitle}
          categoryLinks={footer.categories.data}
          legalTitle={footer.legalTitle}
          legalLinks={footer.legalLinks}
          socialTitle={footer.socialTitle}
          socialLinks={footer.socialLinks}
        />}

        <Analytics />

      </body>
    </html >
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
