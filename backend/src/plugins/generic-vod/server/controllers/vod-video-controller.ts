import { factories } from '@strapi/strapi'
import pluginId from '../../admin/src/pluginId'
import { getVodVideoService } from '../utils'

const model = `plugin::${pluginId}.vod-video`

// @ts-ignore
export default factories.createCoreController(model, ({ strapi }) => ({
  async count(ctx) {
    return await strapi.entityService.count(model, ctx.query)
  },
  async token(ctx: any) {
    try {

      ctx.body = await getVodVideoService(strapi).token(ctx.params.videoId)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
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
