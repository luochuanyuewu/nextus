import { Strapi } from '@strapi/strapi';
import { isAllowedTo } from '.';
import { mainCreateAction, mainDeleteAction, mainReadAction, mainUpdateAction } from "../../admin/src/actions";

const addFiltersClause = (params, filtersClause) => {
  params.filters = params.filters || {};
  if (params.filters.$and) {
    params.filters.$and.push(filtersClause);
  } else {
    params.filters.$and = [filtersClause];
  }
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async createVideoId(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainCreateAction)) {
        return ctx.forbidden();
      }

      return await strapi.plugin('generic-vod').service('ali-vod-service').createUploadVideo(ctx.request.body)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async refreshVideoId(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainCreateAction)) {
        return ctx.forbidden();
      }

      return await strapi.plugin('generic-vod').service('ali-vod-service').refreshUploadVideo(ctx.request.body.videoId)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async create(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainCreateAction)) {
        return ctx.forbidden();
      }

      ctx.body = await strapi.plugin('generic-vod').service('ali-vod-service').create(ctx.request.body)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async findAll(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainReadAction)) {
        return ctx.forbidden();
      }

      const queryParams = {
        filters: {}, // cannot filter for RBAC reasons
      };

      const { user } = ctx.state;
      if (user.roles[0].code !== 'strapi-super-admin') {
        addFiltersClause(queryParams, { createdBy: user.id }); // filter created by user id or change it to anything you want to filter by. 自定义Relation过滤。
      }


      ctx.body = await strapi.plugin('generic-vod').service('ali-vod-service').findAll(queryParams)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async token(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainReadAction)) {
        return ctx.forbidden();
      }

      ctx.body = await strapi.plugin('generic-vod').service('ali-vod-service').token(ctx.params.videoId)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async update(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainUpdateAction)) {
        return ctx.forbidden();
      }

      ctx.body = await strapi
        .plugin('generic-vod')
        .service('ali-vod-service')
        .update(ctx.params.id, ctx.params.videoId, ctx.request.body)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async delete(ctx: any) {
    try {
      if (!isAllowedTo(strapi, ctx, mainDeleteAction)) {
        return ctx.forbidden();
      }

      return await strapi
        .plugin('generic-vod')
        .service('ali-vod-service')
        .delete(ctx.params.id, ctx.params.videoId)
    } catch (err) {
      ctx.throw(500, err)
    }
  },
})
