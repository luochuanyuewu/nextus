export interface PlayerErrorEvent {
  target: HTMLDivElement
  type: 'error'
  paramData: {
    display_msg: string
    error_code: number
  }
}

export interface PlayerConfig {
  // 播放器外层容器的dom元素id
  id: string
  // 视频播放地址url
  source: string
  // 媒体转码服务的媒体Id
  vid: string
  // 播放权证
  playauth: string
  // 播放器高度，可形如‘100%’或者‘100px’
  height: string
  // 播放器宽度，可形如‘100%’或者‘100px’
  width: string
  // 视频宽度，仅h5支持
  videoWidth: string
  // 视频高度，仅h5支持
  videoHeight: string
  // 播放器自动加载，目前仅h5可用
  preload: boolean
  // 播放器默认封面图片
  cover: string
  // 播放内容是否为直播
  isLive: boolean
  // flv配置
  flvOption: {
    hasAudio: boolean
  }
  // 播放器是否自动播放
  autoplay: boolean
  // 播放器自动循环播放
  rePlay: boolean
  // 指定使用H5播放器
  useH5Prism: boolean
  // 指定使用Flash播放器
  useFlashPrism: boolean
  // H5是否内置播放，有的Android浏览器不起作用
  playsinline: boolean
  // 显示播放时缓冲图标
  showBuffer: boolean
  // 皮肤图片，不建议随意修改该字段，如要修改，请参照皮肤定制
  skinRes: any
  // 功能组件布局配置，不传该字段使用默认布局。传false隐藏所有功能组件，请参照皮肤定制。
  skinLayout: any[] | boolean
  // 控制面板的实现
  controlBarVisibility: 'click' | 'hover' | 'always'
  // 控制栏自动隐藏时间
  showBarTime: number
  // JSON串用于定制性接口参数
  extraInfo: string
  // 是否允许系统右键菜单显示
  enableSystemMenu: boolean
  // 指定播放地址格式，只有使用vid的播放方式时支持
  format: 'mp4' | 'm3u8' | 'flv' | 'mp3'
  // 指定返回音频还是视频，只有使用vid的播放方式时支持。
  mediaType: 'video' | 'audio'
  // 指定排序方式，只有使用vid + plauth播放方式时支持。
  qualitySort: 'desc' | 'asc'
  // 显示视频清晰度，多个用逗号分隔
  // 取值范围：FD（流畅）LD（标清）SD（高清）HD（超清）OD（原画）2K（2K）4K（4K），仅H5支持。
  definition: string
  // 默认视频清晰度，此值是vid对应流的一个清晰度
  defaultDefinition: 'FD' | 'LD' | 'SD' | 'HD' | 'OD' | '2K' | '4K'
  // 声明启用同层H5播放器，启用时设置的值为‘h5’
  x5_type: string
  // 声明视频播放时是否进入到TBS的全屏模式
  x5_fullscreen: boolean
  // 声明视频播在界面上的位置
  x5_video_position: 'top' | 'center'
  // 声明TBS播放器支持的方向
  x5_orientation: 'landscape' | 'landscape'
  // 声明TBS全屏播放是否横屏
  x5LandscapeAsFullScreen: boolean
  // 延迟播放时间，单位为秒。
  autoPlayDelay: number
  // 延迟播放提示文本
  autoPlayDelayDisplayText: string
  // 国际化
  language: string
  languageTexts: string
  // flash启用截图功能
  snapshot: boolean
  // H5设置截图水印
  snapshotWatermark: object
  // Safari浏览器可以启用Hls插件播放，Safari 11除外。
  useHlsPluginForSafari: boolean
  // H5播放flv时，设置是否启用播放缓存，只在直播下起作用
  enableStashBufferForFlv: boolean
  // H5播放flv时，初始缓存大小，只在直播下起作用
  stashInitialSizeForFlv: number
  // 缓冲多长时间后，提示用户切换低清晰度，默认：20秒
  loadDataTimeout: number
  // 最大缓冲超时时间，超过这个时间会有错误提示，默认：60秒
  waitingTimeout: number
  // 直播开始时间，直播时移功能使用，格式为：“2018/01/04 12:00:00”
  liveStartTime: string
  // 直播结束时间，直播时移功能使用，格式为：“2018/01/04 12:00:00”
  liveOverTime: string
  // 直播可用时移查询地址
  liveTimeShiftUrl: string
  // flv直播地址播放时，hls的流地址
  liveShiftSource: string
  // flv直播和hls时移切换是，重新创建播放器方法
  recreatePlayer: Function
  // 是否显示检测按钮，默认为true
  diagnosisButtonVisible: boolean
  // 禁用进度条的Seek，默认为false，仅Flash支持
  disableSeek: boolean
  // 加密类型，播放点播私有加密视频时，设置值为1，默认值为0
  encryptType: 0 | 1
  // 进度条打点内容数组
  progressMarkers: {
    offset: number
    text: string
    isCustomized: boolean
  }[]
  // 点播失败重试次数，默认3次
  vodRetry: number
  // 直播播放失败重试次数，默认5次
  liveRetry: number
}

export type PlayerStatus =
  | 'init'
  | 'ready'
  | 'loading'
  | 'play'
  | 'pause'
  | 'playing'
  | 'waiting'
  | 'error'
  | 'ended'

export interface PlayerProps {
  /** 样式类前缀 */
  prefixCls?: string
  /** 自定义样式类 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  // 播放源
  source?: string
  // 是否是直播
  isLive?: boolean
  // 用于在播放器加载成功前渲染
  loading?: React.ReactNode
  /** 播放器配置 */
  options?: Partial<Omit<PlayerConfig, 'source' | 'isLive'>>
  // aliplayer版本
  version?: string
  // 是否隐藏控制栏
  hideControlbar?: boolean
  changeSourceMode?: 'loadByUrl' | 'init'
  // 播放器CSS模板
  cssLinkTemplate?: string
  // 播放器JS模板
  scriptSrcTemplate?: string
  // 播放器视频初始化按钮渲染完毕
  onReady?: () => void
  // 视频由暂停恢复为播放时触发
  onPlay?: () => void
  // 视频暂停时触发
  onPause?: () => void
  // 能够开始播放音频/视频时发生，会多次触发，仅H5播放器
  onCanplay?: () => void
  // 播放中，会触发多次
  onPlaying?: () => void
  // 当前视频播放完毕时触发
  onEnded?: () => void
  // 直播流中断时触发
  onLiveStreamStop?: () => void
  // m3u8直播流中断后重试事件
  onM3u8Retry?: () => void
  // 控制栏自动隐藏事件
  onHideBar?: () => void
  // 控制栏自动显示事件
  onShowBar?: () => void
  // 数据缓冲事件
  onWaiting?: () => void
  // 截图完成事件
  onSnapshoted?: () => void
  // 播放位置发生改变时触发，仅H5播放器。
  // 可通过getCurrentTime方法，得到当前播放时间。
  onTimeupdate?: () => void
  // 全屏事件，仅H5支持
  onRequestFullScreen?: () => void
  // 取消全屏事件，iOS下不会触发，仅H5支持
  onCancelFullScreen?: () => void
  // 错误事件
  onError?: (e: PlayerErrorEvent) => void
}

export interface PlayerRef {
  getInstance: () => PlayerInstance
}

export interface PlayerInstance {
  /** 播放视频 */
  play: () => void
  /** 暂停视频 */
  pause: () => void
  /** 重播视频 */
  replay: () => void
  /** 跳转到某个已加载的时刻进行播放，时间单位：秒 */
  seek: (time: number) => void
  /** 获取当前的播放时刻，返回的时间单位：秒 */
  getCurrentTime: () => number
  /** 获取视频总时长，返回的时间单位：秒 */
  getDuration: () => number
  /** 获取当前的音量 */
  getVolume: () => number
  /** 设置当前的音量 */
  setVolume: (vol: number) => void
  /** 设置当前的音量 */
  loadByUrl: (url: string, time?: number) => void
  /** 设置播放器大小 */
  setPlayerSize: (w: number, h: number) => void
  /** 手动设置播放的倍速，支持0.5~2倍速播放 */
  setSpeed: (speed: number) => void
  /** 设置截图参数 */
  setSanpshotProperties: (w: number, h: number, rate: number) => void
  fullscreenService: {
    /** 播放器全屏 */
    requestFullScreen: () => void
    /** 播放器退出全屏 */
    cancelFullScreen: () => void
    /** 获取播放器全屏状态 */
    getIsFullScreen: () => boolean
  }
  /** 获取播放器状态 */
  getStatus: () => PlayerStatus
  /** 设置旋转角度 */
  setRotate: (rotate: number) => void
  /** 获取旋转角度 */
  getRotate: () => number
  /** 设置镜像 */
  setImage: (image: 'horizon' | 'vertical') => number
  /** 播放器销毁 */
  dispose: () => void
  /** 设置封面 */
  setCover: (cover: string) => void
  /** 设置打点数据 */
  setProgressMarkers: (markers: any) => void
  /** 设置试看时间 */
  setPreviewTime: (time: number) => void
  /** 获取试看时间 */
  getPreviewTime: () => number
  /** 是否试看 */
  isPreview: () => boolean
  /** 绑定事件 */
  on: (eventName: string, callback: any) => void
  replayByVidAndPlayAuth: (vid: string, playAuth: string) => void
}
