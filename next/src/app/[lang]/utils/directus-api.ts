import { useDirectus } from '@directus/sdk';
import { rest } from '@directus/sdk/rest';

import { getDirectusURL } from './api-helpers';
import { authentication } from '@directus/sdk/auth';
import qs from 'qs';


// Client with REST support
const directusApi = useDirectus(getDirectusURL()).use(rest()).use(authentication());


const fetchAPI = async function (
    path: string,
    urlParamsObject = {},
    options = {},
) {
    try {
        // Merge default and user options
        const mergedOptions = {
            next: { revalidate: 0 },
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getDirectusURL(`/items${path}${queryString ? `?${queryString}` : ""}`)}`;

        const isServer = typeof window === 'undefined';

        const requestUrlRaw = `${getDirectusURL(
            `/items${path}${queryString ? `?${qs.stringify(urlParamsObject, { encode: false })}` : ""}`
        )}`;

        console.log(`${isServer ? "ServerSide请求:" : "ClientSide请求:"}` + requestUrlRaw)

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw new Error(`Please check if your server is running and you set all the required tokens.`);
    }
}

export { directusApi, fetchAPI }