/**
 * lesson controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::lesson.lesson', ({ strapi }) => ({
    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        // some custom logic here
        ctx.query = { ...ctx.query }

        // Calling the default core action
        const { data, meta } = await super.find(ctx);

        // some more custom logic
        meta.date = Date.now()

        return { data, meta };
    },
}));
