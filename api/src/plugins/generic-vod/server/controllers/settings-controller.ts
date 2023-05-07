import {Strapi} from '@strapi/strapi'
import {isAllowedTo} from '.';
import {
  mainCreateAction,
  mainDeleteAction,
  mainReadAction,
  mainUpdateAction,
  settingsReadAction,
  settingsUpdateAction
} from '../../admin/src/actions';

export default ({strapi}: { strapi: Strapi }) => ({
  async getSettings(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, settingsReadAction)
        && !isAllowedTo(strapi, ctx, mainReadAction)
        && !!isAllowedTo(strapi, ctx, mainCreateAction)
        && !!isAllowedTo(strapi, ctx, mainUpdateAction)
        && !!isAllowedTo(strapi, ctx, mainDeleteAction)) {

        return ctx.forbidden();
      }

      console.log('controller.getSettings')

      return await strapi.plugin('generic-vod').service('settings').getSettings(ctx)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async saveSettings(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, settingsUpdateAction)) {
        return ctx.forbidden();
      }

      console.log('controller.saveSettings')

      return await strapi.plugin('generic-vod').service('settings').saveSettings(ctx.request.body)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
})
