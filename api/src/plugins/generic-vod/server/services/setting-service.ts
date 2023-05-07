/**
 * setting-service service
 */
import {Strapi} from "@strapi/strapi";
import {AliVodSettings} from "../../types";

export default ({strapi}: { strapi: Strapi }) => ({
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

    const regionId = await pluginStore.get({
      key: 'regionId',
    })

    const endpoint = await pluginStore.get({
      key: 'endpoint',
    })

    const cateId = await pluginStore.get({
      key: 'cateId',
    })

    const signingKey = await pluginStore.get({
      key: 'signingKey',
    })

    const storageRegion = await pluginStore.get({
      key: 'storageRegion',
    })

    const callbackUrl = await pluginStore.get({
      key: 'callbackUrl',
    })

    const config: AliVodSettings = {
      accessKeyId,
      accessKeySecret,
      regionId,
      endpoint,
      cateId,
      signingKey,
      storageRegion,
      callbackUrl,
    }

    return config;
  },
  async saveSettings(settings: AliVodSettings) {
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
        await pluginStore.set({
          key: 'regionId',
          value: settings.regionId,
        })
        await pluginStore.set({
          key: 'storageRegion',
          value: settings.storageRegion,
        })
        await pluginStore.set({
          key: 'storageRegion',
          value: settings.storageRegion,
        })
        return true
      }
    } catch {
      return false
    }
  },
})

