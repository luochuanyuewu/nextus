import { readItem, readItems, useDirectus } from "@directus/sdk";
import { rest } from "@directus/sdk/rest";

import { authentication } from "@directus/sdk/auth";
import { getDirectusURL } from "./api-helpers";

// const fetchAPI = async function (
//     path: string,
//     urlParamsObject = {},
//     options = {},
// ) {
//     try {
//         // Merge default and user options
//         const mergedOptions = {
//             next: { revalidate: 0 },
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             ...options,
//         };

//         // Build request URL
//         const queryString = qs.stringify(urlParamsObject);
//         const requestUrl = `${getDirectusURL(`/items${path}${queryString ? `?${queryString}` : ""}`)}`;

//         const isServer = typeof window === 'undefined';

//         const requestUrlRaw = `${getDirectusURL(
//             `/items${path}${queryString ? `?${qs.stringify(urlParamsObject, { encode: false })}` : ""}`
//         )}`;

//         console.log(`${isServer ? "ServerSide请求:" : "ClientSide请求:"}` + requestUrlRaw)

//         // Trigger API call
//         const response = await fetch(requestUrl, mergedOptions);
//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.error(error);
//         throw new Error(`Please check if your server is running and you set all the required tokens.`);
//     }
// }

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  has_children: boolean;
  children?: Array<NavigationItem>;
  parent?: NavigationItem;
}

export interface Navigation {
  id: string;
  title: string;
  items?: Array<NavigationItem>;
}

export interface Schema {
  navigation: Navigation[];
}

export function getDirectusSDK() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useDirectus<Schema>(getDirectusURL())
    .use(rest())
    .use(authentication());

  console.log("token:" + process.env.NEXT_PUBLIC_DIRECTUS_TOKEN);
  api.setToken(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN as any);

  return { api };
}
