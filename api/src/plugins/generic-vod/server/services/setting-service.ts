/**
 * setting-service service
 */
import { Strapi } from "@strapi/strapi";
import * as $OpenApi from '@alicloud/openapi-client';

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'fuckyou.'
  },
  async getSettings() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'generic-vod',
    })

    const accessKeyId = await pluginStore.get({
      key: 'accessKeyId',
    })

    const accessKeySecret = await pluginStore.get({
      key: 'accessKeySecret',
    })

    const endpoint = await pluginStore.get({
      key: 'endpoint',
    })

    const config = new $OpenApi.Config()
    config.accessKeyId = accessKeyId
    config.accessKeySecret = accessKeySecret
    config.endpoint = endpoint
    return config;
  },
  async saveSettings(settings: $OpenApi.Config) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'generic-vod',
    })

    try {
      const isValid = true
      if (isValid) {
        await pluginStore.set({
          key: 'accessKeyId',
          value: settings.accessKeyId,
        })

        await pluginStore.set({
          key: 'accessKeySecret',
          value: settings.accessKeySecret,
        })

        await pluginStore.set({
          key: 'endpoint',
          value: settings.endpoint,
        })
        return true
      }
    } catch {
      return false
    }
  },
})

