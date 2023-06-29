import { useDirectus } from '@directus/sdk';
import { rest } from '@directus/sdk/rest';

import { getDirectusURL } from './api-helpers';
import { authentication } from '@directus/sdk/auth';

// Client with REST support
const directusApi = useDirectus(getDirectusURL()).use(rest()).use(authentication());


export { directusApi }