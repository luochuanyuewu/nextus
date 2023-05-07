import { request } from '@strapi/helper-plugin'

import pluginId from '../pluginId'
import { InputData } from '../../../types'

const assetsRequests = {
    getAllvideos: async () => {
        return await request(`/${pluginId}/vod-asset`, {
            method: 'GET',
        })
    },
    getToken: async (videoId: string) => {
        return await request(`/${pluginId}/vod-asset/token/${videoId}`, {
            method: 'GET',
        })
    },
    createVideoId: async (body: Object) => {
        return await request(`/${pluginId}/vod-asset/create`, {
            method: 'POST',
            body,
        })
    },
    create: async (body: Object) => {
        return await request(`/${pluginId}/vod-asset`, {
            method: 'POST',
            body,
        })
    },
    update: async (id: number, videoId: string, body: InputData) => {
        return await request(`/${pluginId}/vod-asset/${id}/${videoId}`, {
            method: 'PUT',
            body,
        })
    },
    delete: async (id: number, videoId: string) => {
        return await request(`/${pluginId}/vod-asset/${id}/${videoId}`, {
            method: 'DELETE',
        })
    },
}

export default assetsRequests
