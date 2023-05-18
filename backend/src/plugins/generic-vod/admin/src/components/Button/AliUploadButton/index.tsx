import React, { useEffect, useState } from 'react'

import OSS from '../../../assets/AliVod/lib/aliyun-oss-sdk-6.17.1.min'

import { Button } from '@strapi/design-system'
import { useNotification } from '@strapi/helper-plugin'
import assetsRequests from '../../../api/assets'
import '../../../assets/AliVod/aliyun-upload-sdk-1.5.5.min'

import { CloudUpload } from '@strapi/icons'
import { AliVodSettings, InputData } from "../../../../../types"
import settingsRequests from "../../../api/settings"
import { CustomVideo } from '../../../../../types'
import getTrad from '../../../utils/getTrad'

(window as any).OSS = OSS


export interface VodUploadInfo {
  file: File
  _endpoint?: string | null
  _bucket?: string | null
  _object?: string | null,
  state: string,
  isImage: boolean,
  videoInfo: Object,
  userData: any,
  ri: string
  retry: boolean,
  fileHash: string,
  fileMD5: string,
  region: string,
  videoId: string
  endpoint: string,
  bucket: string,
  object: string,
  loaded: number,
  checkpoint: any
}

export interface VodFileListItem {
  file: File
}


export interface VodUploader {
  startUpload(): void

  stopUpload(): void

  getCheckpoint(file: File): any;

  /***
   * 设置上传地址和上传凭证
   * @param uploadInfo 将onUploadstarted回调中的第一个参数进行透传
   * @param uploadAuth CreateUploadVideo接口返回
   * @param uploadAddress CreateUploadVideo接口返回
   * @param videoId CreateUploadVideo接口返回
   */
  setUploadAuthAndAddress(uploadInfo: VodUploadInfo, uploadAuth: string, uploadAddress: string, videoId: string): void

  /**
   * 上传凭证失效后恢复上传
   * @param uploadAuth 为RefreshUploadVideo接口中返回的上传凭证。
   */
  resumeUploadWithAuth(uploadAuth: string): void

  listFiles(): VodFileListItem

  cancelFile(index: number): void

  resumeFile(index: number): void

  deleteFile(index: number): void

  cleanList(): void

  addFile(
    file: File,
    endPoint?: string | null,
    bucket?: string | null,
    object?: string | null,
    paramData?: string, //{"vod":{}}   这个参数的意义查看：https://www.alibabacloud.com/help/zh/apsaravideo-for-vod/latest/api-doc-vod-2017-03-21-api-doc-createuploadvideo#api-detail-35
  ): void
}


export interface IAliUploadButtonProps {
  currentFile: File | undefined
  title: string
  description: string
  tags: string[]
  metadata: { key: string; value: string }[]
  onUploadStarted?: (uploadInfo: VodUploadInfo) => void
  onUploadSucceed?: (uploadInfo: VodUploadInfo) => void
  onUploadEnd?: (uploadInfo: VodUploadInfo) => void
  // 播放器回调事件
}

const UploadButton = function ({
  currentFile,
  title,
  description,
  tags,
  metadata,
  onUploadStarted,
  onUploadSucceed,
  onUploadEnd

}: IAliUploadButtonProps) {

  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [settings, setSettings] = useState<AliVodSettings>()


  const getSettings = async () => {
    const settings = await settingsRequests.get()
    setSettings(settings)
  }


  useEffect(() => {
    getSettings()
  }, [])

  const notification = useNotification()


  const createUploader = function (): VodUploader {
    return new (window as any).AliyunUpload.Vod({
      timeout: 60000,
      partSize: Math.round(1048576),
      parallel: 5,
      retryCount: 3,
      retryDuration: 2,
      region: settings?.regionId,
      userId: "1597842716855716",
      localCheckpoint: true,
      addFileSuccess: function (uploadInfo: VodUploadInfo) {
        console.log("addFileSuccess:" + JSON.stringify(uploadInfo))
      },
      onUploadstarted: async function (uploadInfo: VodUploadInfo) {
        console.log("onUploadstarted:" + JSON.stringify(uploadInfo))
        try {
          if (!uploadInfo.videoId) {
            const { videoId, uploadAddress, uploadAuth } = await assetsRequests.createVideoId({
              title: title,
              fileName: uploadInfo.file.name,
              hashId: uploadInfo.fileHash,
              fileSize: uploadInfo.file.size,
              transcodeTemplateGroupId: ''
            })
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress,
              videoId
            )
          } else {
            const { videoId, uploadAddress, uploadAuth } = await assetsRequests.refreshVideoId({
              videoId: uploadInfo.videoId
            })
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress,
              videoId
            )
          }

          setIsUploading(true)

          if (onUploadStarted) {
            onUploadStarted(uploadInfo)
          }

        } catch (e: any) {
          console.log("onUploadstarted Error:" + e)
        }
      },
      onUploadSucceed: async function (uploadInfo: VodUploadInfo) {
        // console.log("onUploadSucceed:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        console.log("onUploadSucceed:" + JSON.stringify(uploadInfo))
        try {

          const { videoMeta } = await assetsRequests.getToken(uploadInfo.videoId)

          const body = {
            title: title,
            description: description,
            videoId: uploadInfo.videoId,
            thumbnail: videoMeta.coverURL,
            metadata: metadata
          }
          const data = await assetsRequests.create(body)
          if (data) {
            setIsUploading(false)
            if (onUploadSucceed) {
              onUploadSucceed(uploadInfo)
            }
          } else {
            console.log("视频成功上传到阿里云，但在strapi中创建失败。")
            notification({
              type: 'warning',
              message: getTrad('video.createFailed'),
            })
          }
          notification({
            type: 'success',
            message: getTrad('upload.uploadSucceed'),
          })
        } catch (error) {
          console.log(error)
        }

      },
      onUploadFailed: function (uploadInfo: any, code: any, message: string) {
        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
        notification({
          type: 'warning',
          message: getTrad("upload.uploadFailed"),
        })
      },
      onUploadCanceled: function (uploadInfo: VodUploadInfo, code: number, message: string) {
        console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
        notification({
          type: 'info',
          message: getTrad('upload.uploadCanceled'),
        })
      },
      onUploadProgress: function (uploadInfo: VodUploadInfo, totalSize: number, progress: number) {
        console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
        let progressPercent = Math.ceil(progress * 100)
        setProgress(Math.round(progressPercent))
      },
      onUploadTokenExpired: async function (uploadInfo: VodUploadInfo) {
        console.log('上传凭证过期')
        // 实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
        // https://help.aliyun.com/document_detail/55408.html
        // 从点播服务刷新的uploadAuth,设置到SDK里
        try {

          const { videoId, uploadAddress, uploadAuth } = await assetsRequests.refreshVideoId({
            videoId: uploadInfo.videoId
          })
          uploader.resumeUploadWithAuth(uploadAuth)
        } catch (e: any) {
          // 清理上传文件列表
          notification({
            type: 'warning',
            message: getTrad('upload.tokenRefreshFailed')
          })
        }
      },
      onUploadEnd: function (uploadInfo: any) {
        console.log("onUploadEnd: uploaded all the files")
        if (onUploadEnd) {
          onUploadEnd(uploadInfo)
        }
      }
    }
    )
  }

  // let uploader: any
  // useEffect(() => {
  //   uploader = createUploader()
  //   if (uploader) {
  //     console.log("创建上传器")
  //   }
  //   return (() => {
  //     if (uploader) {
  //       console.log("销毁上传器")
  //       uploader = null
  //     }
  //   })
  // }, [])
  const uploader = createUploader()

  const fileInputChange = async () => {
    if (currentFile) {
      try {
        var userData = '{"Vod":{}}'
        // uploader = createUploader()

        await uploader.addFile(currentFile, null, null, null, userData)

        await uploader.startUpload()
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div>
      <Button
        endIcon={<CloudUpload />}
        loading={isUploading}
        onClick={fileInputChange}
        disabled={currentFile === undefined}
      >
        {isUploading ? getTrad('Uploading') + `${progress}%` : `Upload`}
      </Button>
    </div>

  )
}

export default UploadButton
