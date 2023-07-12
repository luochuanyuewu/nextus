import { readItem, readItems, readSingleton, useDirectus } from "@directus/sdk";
import { rest } from "@directus/sdk/rest";

import { authentication } from "@directus/sdk/auth";
import { getDirectusURL } from "./api-helpers";
import { Schema } from "@/types/schemas";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useDirectus<Schema>(getDirectusURL())
  .use(rest())
  .use(authentication());

api.setToken(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN as any);

export function getDirectusSDK() {
  return { api };
}
