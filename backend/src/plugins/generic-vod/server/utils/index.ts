import { AliVodeService } from "../../types"


const videoContentType = 'vod-video'
const AliVodService = 'ali-vod-service'
const pluginName = 'generic-vod'
const videoModel = `plugin::${pluginName}.${videoContentType}`


const getAliVodService = (strapi: any): AliVodeService => {
    return strapi.plugin('generic-vod').service('ali-vod-service')
}

export {
    AliVodService,
    pluginName,
    getAliVodService
}