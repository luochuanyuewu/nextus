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

export interface AliVodeService extends Record<string, any> {
  getVideoPlayAuth: (videoId: string) => Promise<any> | null
  createUploadVideo: (data: InputData) => Promise<any> | null
  refreshUploadVideo: (videoId: string) => Promise<any>
  findAll: (query: any) => Promise<any>
  token: (videoId: any) => Promise<any>
  create: (data: CustomVideo) => Promise<any>
  delete: (id: string, videoId: string) => Promise<boolean>
  update: (id: string, videoId: string, data: InputData) => Promise<any>
}
