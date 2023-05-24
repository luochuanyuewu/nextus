import { getFetchClient } from '@strapi/helper-plugin'

import pluginId from '../pluginId'
import { AliVodSettings } from '../../../types'


const { get, post, put, del } = getFetchClient();

const settingsRequests = {
  get: async (): Promise<AliVodSettings> => {
    const res = await get(`/${pluginId}/settings`)
    return res.data
  },
  update: async (body: Object) => {
    const res = await post(`/${pluginId}/settings`, body)
    return res.data
  },
}

export default settingsRequests
