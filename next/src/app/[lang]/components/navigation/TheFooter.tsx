import LogoV2 from "../LogoV2";
import TypographyHeadline from "../typography/TypographyHeadline";
import TypographyTitle from "../typography/TypographyTitle";
import {  NavigationItem } from "@/types/schemas";
import directusApi from "../../utils/directus-api";
import { readItem, readItems, readSingleton } from "@directus/sdk";
import VIcon from "../base/VIcon";

async function TheFooter() {
  function getUrl(item: NavigationItem) {
    if (item.type === "page") {
      return `/${item.page.slug}`;
    } else {
      return item.url;
    }
  }

  const navigation = await directusApi.request(
    readItem("navigation", "footer", {
      // @ts-ignore
      fields: ["items.*", "items.page.slug", "items.children.*"],
    })
  );

  const form = await directusApi.request(
    readItems("forms", {
      filter: {
        key: {
          _eq: "newsletter",
        },
      },
    })
  );

  const globals = await directusApi.request(readSingleton("globals"));

  const { tagline, title, social_links } = globals;

  return (
    <footer
      className="relative px-6 pb-8 bg-white md:mx-6 md:mb-6 dark:bg-gray-900 rounded-tl-3xl rounded-br-3xl"
      aria-labelledby="footer-heading"
    >
      <div className="py-12 mx-auto md:px-12">
        {/* Header */}
        <div className="flex justify-between">
          <div className="w-full">
            <a href="/">
              <LogoV2 className="h-8 dark:text-white" />
            </a>
            <p className="mt-2 font-mono text-sm text-gray-500">{tagline}</p>
          </div>
          <div className="flex items-center justify-end w-full space-x-2">
            {/* <DarkModeToggle className="hidden text-gray-600 md:block hover:text-gray-400" /> */}
          </div>
        </div>

        {/* Navigation + Form */}
        <nav className="grid gap-8 mt-8 md:grid-cols-2 xl:mt-0 xl:col-span-2">
          <div>
            <TypographyTitle>Menu</TypographyTitle>
            <ul role="list" className="grid grid-flow-col mt-4 md:grid-cols-2">
              {navigation &&
                navigation.items.map((item: NavigationItem) => (
                  <li key={item.id}>
                    <a
                      href={getUrl(item)}
                      className="font-mono font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-accent"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="relative p-6 overflow-hidden border-2 lg:justify-end md:grid md:grid-cols-1 border-accent rounded-tl-3xl rounded-br-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-800 dark:via-gray-900 dark:to-gray-600" />
            <div className="absolute inset-0 grain-bg dark:opacity-10" />
            <div className="relative w-full md:mt-0">
              <TypographyHeadline content="<p>Subscribe to our <em>newsletter</em></p>">
                Subscribe to our newsletter
              </TypographyHeadline>
              {/* {form && <VForm className="mt-4" form={form} />} */}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className="py-6 mx-auto border-t dark:border-t-gray-700 max-w-7xl md:flex md:items-center md:justify-between lg:px-16">
        <div className="flex items-center justify-center space-x-6 md:order-last md:mb-0">
          {social_links &&
            social_links.map((link) => (
              <a
                key={link.service}
                href={link.url}
                target="_blank"
                className="w-6 h-6 text-white"
              >
                <span className="sr-only">{link.service}</span>
                {/* <Icon
                className="w-8 h-8 text-gray-700 dark:text-white hover:opacity-75"
                icon={`mdi:${link.service}`}
              /> */}
              </a>
            ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <span className="mt-2 font-serif text-gray-700 dark:text-gray-300">
            Copyright © 1988 - {new Date().getFullYear()}
            <a
              href="/"
              className="mx-2 hover:text-accent"
              rel="noopener noreferrer"
            >
              {title}.
            </a>
            All rights reserved.
          </span>
          {/* You're free to remove this footer if you want. But we'd appreciate it if you keep the credits. */}
          <span className="mt-2 font-serif text-gray-700 dark:text-gray-300">
            <VIcon icon="heroicons:bolt" className="w-4 h-4 text-accent" />
            Site powered by
            <a
              href="https://www.directus.io?ref=agencyos_footer"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b dark:border-b-gray-700 hover:text-accent"
            >
              Directus
            </a>
            and
            <a
              href="https://www.nuxt.com?ref=agencyos_footer"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b dark:border-b-gray-700 hover:text-accent"
            >
              Nuxt
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}

export default TheFooter;
