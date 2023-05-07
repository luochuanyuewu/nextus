export interface CustomVideo {
    title: string
    description: string
    _public: boolean
    videoId: string
    hls: string
    iframe: string
    mp4: string
    player: string
    thumbnail: string
    tags: string[]
    metadata: {
        key: string
        value: string
    }[]
    createdAt: Date
    id: number
    updatedAt: Date
}
export interface CustomAssets {
    hls: string
    iframe: string
    mp4: string
    player: string
}

export interface CustomSettings {
    apiKey: string
    defaultPublic: boolean
}

export interface AliVodSettings {
  accessKeyId: string
  accessKeySecret: string
  endpoint: boolean  // 'http://vod.' + regionId + '.aliyuncs.com',
  apiVersion: '2017-03-21'
}

export interface InputData {
    title: string
    description?: string
    _public: boolean
    tags?: string[]
    metadata?: {
        key: string
        value: string
    }[]
}
export interface InputDataMetadata {
    key: string
    value: string
}
