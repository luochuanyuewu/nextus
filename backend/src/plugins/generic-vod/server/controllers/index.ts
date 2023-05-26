import { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';
import adminController from "./admin-controller";
import settingController from './settings-controller';
import vodVideoController from './vod-video-controller'

const model = `plugin::${pluginId}.vod-video`

//判断用户是否拥有“action”里指定的权限。
export const isAllowedTo = (strapi: Strapi, ctx: any, action: string) => {
  const pm = (strapi as any).admin.services.permission.createPermissionsManager({
    ability: ctx.state.userAbility,
    action: action,
    model,
  });
  return pm.isAllowed;
}


export default {
  admin: adminController,
  settings: settingController,
  'vod-video': vodVideoController
};
