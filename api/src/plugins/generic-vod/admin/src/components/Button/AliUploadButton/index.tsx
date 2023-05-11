import React, {useEffect, useState} from 'react'

import OSS from '../../../assets/AliVod/lib/aliyun-oss-sdk-6.17.1.min'

import '../../../assets/AliVod/aliyun-upload-sdk-1.5.5.min'
import assetsRequests from '../../../api/assets'
import {Button} from '@strapi/design-system'
import {useNotification} from '@strapi/helper-plugin'

import {CloudUpload} from '@strapi/icons'
import settingsRequests from "../../../api/settings";
import {AliVodSettings} from "../../../../../types";

(window as any).OSS = OSS

export interface IAliUploadButtonProps {
  currentFile: File | undefined
  title: string
  description: string
  tags: string[]
  metadata: { key: string; value: string }[]
  onUploadStarted?: (uploadInfo: any) => void
  onUploadSucceed?: (uploadInfo: any) => void
  onUploadEnd?: (uploadInfo: any) => void
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

  let uploader: any;

  const createUploader = function () {
    uploader = new (window as any).AliyunUpload.Vod({
        timeout: 60000,
        partSize: Math.round(1048576),
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: settings?.regionId,
        userId: "1597842716855716",
        localCheckpoint: true,
        addFileSuccess: function (uploadInfo: any) {
          console.log("addFileSuccess: " + uploadInfo.file.name)
        },
        onUploadstarted: async function (uploadInfo: any) {
          try {
            if (!uploadInfo.videoId) {
              const {videoId, uploadAddress, uploadAuth} = await assetsRequests.createVideoId({
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
              const {videoId, uploadAddress, uploadAuth} = await assetsRequests.refreshVideoId({
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
            notification({
              type: 'warning',
              message: 'onUploadstarted Error:' + e,
            })
          }
        },
        onUploadSucceed: async function (uploadInfo: any) {
          //TODO 确保上传成功，才创建。
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          console.log("uploadInfo:" + JSON.stringify(uploadInfo))
          try {
            const body = {
              title: title,
              description: description,
              videoId: uploadInfo.videoId,

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
                message: 'video.createFailed',
              })
            }
            notification({
              type: 'success',
              message: 'upload.uploadSucceed',
            })
          } catch (error) {
            console.log(error)
          }

        },
        onUploadFailed: function (uploadInfo: any, code: any, message: string) {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          notification({
            type: 'warning',
            message: 'upload.uploadFailed',
          })
        },
        onUploadCanceled: function (uploadInfo: any, code: any, message: string) {
          console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          notification({
            type: 'info',
            message: 'upload.uploadCanceled',
          })
        },
        onUploadProgress: function (uploadInfo: any, totalSize: any, progress: any) {
          console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
          let progressPercent = Math.ceil(progress * 100)
          setProgress(Math.round(progressPercent))
        },
        onUploadTokenExpired: async function (uploadInfo: any) {
          console.log('上传凭证过期')
          // 实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
          // https://help.aliyun.com/document_detail/55408.html
          // 从点播服务刷新的uploadAuth,设置到SDK里
          try {

            const {videoId, uploadAddress, uploadAuth} = await assetsRequests.refreshVideoId({
              videoId: uploadInfo.videoId
            })
            uploader.resumeUploadWithAuth(uploadAuth)
          } catch (e: any) {
            // 清理上传文件列表
            notification({
              type: 'warning',
              message: "upload.tokenRefreshFailed"
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

    uploader.addFileSuccess = function (uploadInfo: any) {
      console.log("addFileSuccess: " + uploadInfo.file.name)
    }

    return uploader
  }


  const fileInputChange = async () => {
    const body = {
      title: title,
      description: description,
      fileName: currentFile?.name,
      tags: tags,
      metadata: metadata,
    }
    if (currentFile) {
      try {
        var userData = '{"Vod":{}}'
        uploader = createUploader()
        console.log(userData)

        uploader.addFile(currentFile, null, null, null, userData)

        const res: any = await uploader.startUpload()
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div>
      <Button
        endIcon={<CloudUpload/>}
        loading={isUploading}
        onClick={fileInputChange}
        disabled={currentFile === undefined}
      >
        {isUploading ? `Uploading ${progress}%` : `Upload`}
      </Button>
    </div>

  )
}

export default UploadButton
