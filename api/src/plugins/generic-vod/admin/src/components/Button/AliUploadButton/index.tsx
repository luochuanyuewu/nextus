import React, {FC, useState} from 'react'

import OSS from '../../../assets/AliVod/lib/aliyun-oss-sdk-6.17.1.min'

import '../../../assets/AliVod/aliyun-upload-sdk-1.5.5.min'
import assetsRequests from '../../../api/assets'
import {Button} from '@strapi/design-system'
import {useNotification} from '@strapi/helper-plugin'

import {CloudUpload} from '@strapi/icons'

(window as any).OSS = OSS


interface AliyunUpload {
  startUpload(): void

  stopUpload(): void

  resumeUploadWithAuth(uploadAuth: any): void

  listFiles(): any

  deleteFile(index: number): void

  addFile(
    file: File,
    endPoint: string | null,
    bucket: string | null,
    object: any,
    videoInfo: Object | null,
    unknown?: string
  ): void
}


export interface IAliUploadButtonProps {
  currentFile: File | undefined
  title: string
  description: string
  tags: string[]
  metadata: { key: string; value: string }[]
  update: () => void
  close: () => void

  region?: string
  timeout?: number
  userId?: string
}

const UploadButton: FC<IAliUploadButtonProps> = ({
                                                   currentFile,
                                                   title,
                                                   description,
                                                   tags,
                                                   metadata,
                                                   update,
                                                   close,
                                                   region, timeout, userId

                                                 }): JSX.Element => {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const notification = useNotification()

  let uploader: any;

  const createUploader = function () {
    uploader = new (window as any).AliyunUpload.Vod({
      timeout: timeout || 60000,
      partSize: Math.round(1048576),
      parallel: 5,
      retryCount: 3,
      retryDuration: 2,
      region: region,
      userId: userId,
      localCheckpoint: true,
      addFileSuccess: function (uploadInfo: any) {
        console.log("addFileSuccess: " + uploadInfo.file.name)
      },
      onUploadstarted: function (uploadInfo: any) {
        const {newVideo, token} = await assetsRequests.createVideoId({
          filename: uploadInfo.file.name,
          hashId: uploadInfo.fileHash,
          fileSize: uploadInfo.file.size
        })
        try {
          if (!uploadInfo.videoId) {
            const {auth} = await self.$courseVideoService.initUpload({
              payload: {
                filename: uploadInfo.file.name,
                hashId: uploadInfo.fileHash,
                fileSize: uploadInfo.file.size,
                courseId: self.courseId,
                transcodeTemplateGroupId: self.transcodeTemplateGroupId,
              },
            })

            const uploadAuth = auth.uploadAuth
            const uploadAddress = auth.uploadAddress
            const videoId = auth.videoId
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress,
              videoId
            )

            // 如果videoId有值，根据videoId刷新上传凭证
            // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY

            // if (!uploadInfo.videoId) {
            //   let createUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
            //   axios.get(createUrl).then(({data}) => {
            //     let uploadAuth = data.UploadAuth
            //     let uploadAddress = data.UploadAddress
            //     let videoId = data.VideoId
            //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            //   })
            //   self.statusText = '文件开始上传...'
            //   console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            // } else {
            //   let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            //   axios.get(refreshUrl).then(({data}) => {
            //     let uploadAuth = data.UploadAuth
            //     let uploadAddress = data.UploadAddress
            //     let videoId = data.VideoId
            //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            //   })
            // }
          }
        ,
          onUploadSucceed: function (uploadInfo: any) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          }
        ,
          onUploadFailed: function (uploadInfo: any, code: any, message: string) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          }
        ,
          //   onUploadCanceled: function (uploadInfo, code, message) {
          //     console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          //     self.statusText = '文件已暂停上传'
          //   },
          onUploadProgress: function (uploadInfo: any, totalSize: any, progress: any) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            let progressPercent = Math.ceil(progress * 100)
            setProgress(Math.round(progressPercent))

          }
        ,
          onUploadTokenExpired: async function (uploadInfo: any) {
            const uploadAuth = await assetsRequests.getToken(uploadInfo.videoId)
            uploader.resumeUploadWithAuth(uploadAuth)
            console.log("刷新凭证")
          }
        ,
          onUploadEnd: function (uploadInfo: any) {
            console.log("onUploadEnd: uploaded all the files")
            console.log("文件上传完毕：" + uploadInfo)
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
          setIsUploading(true)

          var userData = '{"Vod":{}}'
          uploader = createUploader()
          console.log(userData)

          uploader.addFile(currentFile, null, null, null, userData)

          // const uploader = new VideoUploader({
          //   file: currentFile,
          //   accessToken: token.accessToken,
          //   refreshToken: token.refreshToken,
          //   videoId: newVideo.videoId,
          // })
          try {

            const res: any = await uploader.startUpload()

            // const res: any = await uploader.startUpload()
            //
            // const body = {
            //   title: res.title,
            //   description: res.description,
            //   _public: res._public,
            //   videoId: res.videoId,
            //   hls: res.assets.hls,
            //   iframe: res.assets.iframe,
            //   mp4: res?.assets?.mp4,
            //   player: res.assets.player,
            //   thumbnail: res?.assets?.thumbnail,
            //   tags: res.tags,
            //   metadata: res.metadata,
            // }
            // const data = await assetsRequests.create(body)
            // if (data) {
            //   setIsUploading(false)
            //   update()
            // } else {
            //   notification({
            //     type: 'warning',
            //     message: 'Error while creating video',
            //   })
            // }
          } catch (e) {
            console.error(e)
          }
          close()
        }
      }

      return(
    <Button
      endIcon={<CloudUpload/>}
      loading={isUploading}
      onClick={fileInputChange}
      disabled={currentFile === undefined}
    >
      {isUploading ? `Uploading ${progress}%` : `Upload`}
    </Button>
  )
  }

    export default UploadButton
