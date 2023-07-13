
import {authentication} from "@directus/sdk/auth";
import {getDirectusURL} from "./api-helpers";
import {Schema} from "@/types/schemas";
import {rest, useDirectus} from "@directus/sdk";

// eslint-disable-next-line react-hooks/rules-of-hooks
const directusApi = useDirectus<Schema>(getDirectusURL())
    .use(rest())
    .use(authentication());

directusApi.setToken(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || 'http://localhost:8055');

export default directusApi
