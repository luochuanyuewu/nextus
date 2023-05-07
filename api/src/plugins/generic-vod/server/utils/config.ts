import Vod20170321, * as Vod from "@alicloud/vod20170321";
import * as $OpenApi from '@alicloud/openapi-client';
//从strapi的store获取阿里配置信息
const getConfig = async (strapi): Promise<$OpenApi.Config> => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'generic-vod',
  })

  // const defaultPublic = await pluginStore.get({
  //   key: 'accessKeyId',
  // })
  //
  // const configKey = await pluginStore.get({
  //   key: 'apiKey',
  // })

  const accessKeyId = await pluginStore.get({
    key: 'accessKeyId',
  })

  const accessKeySecret = await pluginStore.get({
    key: 'accessKeySecret',
  })

  const regionId = await pluginStore.get({
    key: 'regionId',
  })

  const endpoint = await pluginStore.get({
    key: 'endpoint',
  })

  const config = new $OpenApi.Config()
  config.accessKeyId = accessKeyId
  config.accessKeySecret = accessKeySecret
  config.regionId = regionId
  config.endpoint = endpoint
  return config;
}


const configClient = async (strapi: any) => new Vod20170321(await getConfig(strapi))

export {Vod, getConfig, configClient}
