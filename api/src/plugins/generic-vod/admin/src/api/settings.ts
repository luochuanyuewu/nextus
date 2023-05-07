import { request } from '@strapi/helper-plugin'

import pluginId from '../pluginId'
import { AliVodSettings } from '../../../types'

const settingsRequests = {
    get: async (): Promise<AliVodSettings> => {
        return await request(`/${pluginId}/settings`, {
            method: 'GET',
        })
    },
    update: async (body: Object) => {
        return await request(`/${pluginId}/settings`, {
            method: 'POST',
            body,
        })
    },
}

export default settingsRequests
