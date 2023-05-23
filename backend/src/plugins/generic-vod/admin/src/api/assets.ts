import {request} from '@strapi/helper-plugin'

import pluginId from '../pluginId'
import {InputData} from '../../../types'

const assetsRequests = {
  getAllvideos: async () => {
    return await request(`/${pluginId}/vod-video`, {
      method: 'GET',
    })
  },
  getToken: async (videoId: string) => {
    return await request(`/${pluginId}/vod-video/token/${videoId}`, {
      method: 'GET',
    })
  },
  createVideoId: async (body: Object) => {
    return await request(`/${pluginId}/vod-video/create`, {
      method: 'POST',
      body,
    })
  },
  refreshVideoId: async (body: Object) => {
    return await request(`/${pluginId}/vod-video/refresh`, {
      method: 'POST',
      body,
    })
  },
  create: async (body: Object) => {
    return await request(`/${pluginId}/vod-video`, {
      method: 'POST',
      body,
    })
  },
  update: async (id: number, videoId: string, body: InputData) => {
    return await request(`/${pluginId}/vod-video/${id}/${videoId}`, {
      method: 'PUT',
      body,
    })
  },
  delete: async (id: number, videoId: string) => {
    return await request(`/${pluginId}/vod-video/${id}/${videoId}`, {
      method: 'DELETE',
    })
  },
}

export default assetsRequests
