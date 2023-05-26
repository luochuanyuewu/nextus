import { VodVideoService } from "../../types"


const videoContentType = 'vod-video'
const AliVodService = 'vod-video'
const pluginName = 'generic-vod'
const videoModel = `plugin::${pluginName}.${videoContentType}`


const getVodVideoService = (strapi: any): VodVideoService => {
    return strapi.plugin('generic-vod').service('vod-video')
}

export {
    AliVodService,
    pluginName,
    getVodVideoService
}