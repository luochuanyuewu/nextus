export interface CustomVideo {
  title: string
  description: string
  videoId: string
  hls?: string
  iframe?: string
  mp4?: string
  player?: string
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

export interface AliVodSettings {
  accessKeyId: string
  accessKeySecret: string
  endpoint: string  // 'http://vod.' + regionId + '.aliyuncs.com',
  regionId: string
  storageRegion: string
  signingKey: string
  callbackUrl: string
  cateId: string
}

export interface InputData {
  title: string
  description?: string
  fileName?: string
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

