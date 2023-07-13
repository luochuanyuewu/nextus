import type { Metadata } from "next";
import "./globals.css";

import { i18n } from "i18n-config";
import { Analytics } from "@/components/analytics";
import TheHeader from "./components/navigation/TheHeader";
import TheFooter from "./components/navigation/TheFooter";

const FALLBACK_SEO = {
  title: "Directus Starter Next Blog",
  description: "Directus Starter Next Blog",
};

// async function getGlobal(lang: string): Promise<any> {
//   // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

//   // if (!token) throw new Error("The Strapi API Token environment variable is not set.");
//   const query = {
//     fields: ['translations.favicon', 'translations.languages_code', 'translations.meta_title', 'translations.meta_description', 'translations.navbar.*', 'translations.footer.*'],
//     deep: {
//       translations: {
//         _filter: {
//           _and: [
//             {
//               languages_code: {
//                 _eq: lang,
//               },
//             },
//           ],
//         },
//       },
//     },
//   }

//   const response = await directusApi.request(readItems("global", query))

//   return response;
// }

// export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
//   const meta = await getGlobal(params.lang);

//   if (!meta.translations || meta.translations.length === 0) return FALLBACK_SEO;

//   const { meta_title: metaTitle, meta_description: metaDescription, favicon } = meta.translations[0];
//   // const { url } = favicon.data.attributes;
//   const url = new URL(favicon, `${getDirectusURL()}/assets/`)
//   return {
//     title: {
//       template: `%s | ${metaTitle}`,
//       default: metaTitle,
//     },
//     description: metaDescription,
//     icons: {
//       icon: [url]
//       // icon: [new URL(url, getDirectusURL())],
//     },
//   };
// }

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // const global = await getGlobal(params.lang);
  // // TODO: CREATE A CUSTOM ERROR PAGE
  // if (!global.translations || global.translations.length === 0) return null;

  // const { notificationBanner, navbar, footer } = global.translations[0];

  // const navbarLogoUrl = getDirectusMedia(
  //   navbar.logo_image
  // );

  // const footerLogoUrl = getDirectusMedia(
  //   footer ? footer.logo_image : ''
  // );

  // <html lang={params.lang} data-theme={theme ? theme : "light"}>

  return (
    <html lang={params.lang}>
      <head></head>
      <body>
        {/* {navbar && <Navbar
          links={navbar.links}
          buttons={navbar.buttons}
          logoUrl={navbarLogoUrl}
          logoText={navbar.logo_text}
        />} */}

        <div className="relative px-6 pt-6">
          <TheHeader />
        </div>

        <main className="mx-auto max-w-7xl mb-5">{children}</main>

        {/* {notificationBanner && <Banner data={notificationBanner} />} */}

        {/* {footer && <Footer

          logoUrl={footerLogoUrl}
          logoText={footer.logo_text}
          menuTitle={footer.menu_title}
          menuLinks={footer.menu_links}
          categoryTitle={footer.category_title}
          categoryLinks={footer.categories}
          legalTitle={footer.legal_title}
          legalLinks={footer.legal_links}
          // socialTitle={footer.socialTitle}
          socialLinks={footer.social_links}
        />} */}

        <TheFooter />

        <Analytics />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
