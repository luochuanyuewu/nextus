import React, { useState, FC } from 'react'
import { VideoUploader } from '@api.video/video-uploader'
import assetsRequests from '../../../api/assets'
import { Button } from '@strapi/design-system/Button'
import { useNotification } from '@strapi/helper-plugin'

import CloudUpload from '@strapi/icons/CloudUpload'

export interface IUploadButtonProps {
    currentFile: File | undefined
    title: string
    description: string
    _public: boolean,
    tags: string[]
    metadata: { key: string; value: string }[]
    update: () => void
    close: () => void
}

const UploadButton: FC<IUploadButtonProps> = ({
    currentFile,
    title,
    description,
    _public,
    tags,
    metadata,
    update,
    close,
}): JSX.Element => {
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const notification = useNotification()

    const fileInputChange = async () => {
        const body = {
            title: title,
            description: description,
            _public: _public,
            tags: tags,
            metadata: metadata,
        }
        const { newVideo, token } = await assetsRequests.createVideoId(body)
        if (currentFile) {
            setIsUploading(true)
            const uploader = new VideoUploader({
                file: currentFile,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                videoId: newVideo.videoId,
            })
            try {
                uploader.onProgress((e) => setProgress(Math.round((e.uploadedBytes * 100) / e.totalBytes)))

                const res: any = await uploader.upload()

                const body = {
                    title: res.title,
                    description: res.description,
                    _public: res._public,
                    videoId: res.videoId,
                    hls: res.assets.hls,
                    iframe: res.assets.iframe,
                    mp4: res?.assets?.mp4,
                    player: res.assets.player,
                    thumbnail: res?.assets?.thumbnail,
                    tags: res.tags,
                    metadata: res.metadata,
                }
                const data = await assetsRequests.create(body)
                if (data) {
                    setIsUploading(false)
                    update()
                } else {
                    notification({
                        type: 'warning',
                        message: 'Error while creating video',
                    })
                }
            } catch (e) {
                console.error(e)
            }
            close()
        }
    }

    return (
        <Button
            endIcon={<CloudUpload />}
            loading={isUploading}
            onClick={fileInputChange}
            disabled={currentFile === undefined}
        >
            {isUploading ? `Uploading ${progress}%` : `Upload`}
        </Button>
    )
}

export default UploadButton
