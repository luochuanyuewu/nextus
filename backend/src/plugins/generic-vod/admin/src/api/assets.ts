import { getFetchClient } from '@strapi/helper-plugin'

import pluginId from '../pluginId'
import { InputData } from '../../../types'

const { get, post, put, del } = getFetchClient();


const assetsRequests = {
  getAllvideos: async () => {
    const res = await get(`/${pluginId}/vod-video`)
    return res.data
  },
  getToken: async (videoId: string) => {
    const res = await get(`/${pluginId}/vod-video/token/${videoId}`)
    return res.data
  },
  createVideoId: async (body: Object) => {
    const res = await post(`/${pluginId}/vod-video/create`, body)
    return res.data
  },
  refreshVideoId: async (body: Object) => {
    const res = await post(`/${pluginId}/vod-video/refresh`, body)
    return res.data

  },
  create: async (body: Object) => {
    const res = await post(`/${pluginId}/vod-video`, body)
    return res.data
  },
  update: async (id: number, videoId: string, body: InputData) => {
    const res = await put(`/${pluginId}/vod-video/${id}/${videoId}`, body)
    return res.data
  },
  delete: async (id: number, videoId: string) => {
    const res = await del(`/${pluginId}/vod-video/${id}/${videoId}`)
  },
}

export default assetsRequests
