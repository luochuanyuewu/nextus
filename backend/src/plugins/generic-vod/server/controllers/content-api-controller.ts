import { factories } from '@strapi/strapi'
import pluginId from '../../admin/src/pluginId'

const model = `plugin::${pluginId}.vod-video`

export default factories.createCoreController('plugin::generic-vod.vod-video', ({ strapi }) => ({
    async count(ctx) {
        return await strapi.entityService.count(model, ctx.query)
    },
    async find(ctx) {
        return await super.find(ctx);
        // return await strapi.entityService.findMany(model, ctx?.query)
    },
    async findOne(ctx) {
        return await super.findOne(ctx)
        // return await strapi.entityService.findOne(model, ctx.params.id, ctx.query)
    }
}))


// export default factories.createCoreController('plugin::generic-vod.vod-video', ({ strapi }) => ({
//     async count(ctx) {
//         return await strapi.entityService.count(model, ctx.query)
//     },
//     async find(ctx) {
//         return await super.find(ctx);
//         // return await strapi.entityService.findMany(model, ctx?.query)
//     },
//     async findOne(ctx) {
//         return await super.findOne(ctx)
//         // return await strapi.entityService.findOne(model, ctx.params.id, ctx.query)
//     }
// }))
