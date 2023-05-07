import React, { useState, FC } from 'react'
import { Button } from '@strapi/design-system/Button'
import { useNotification } from '@strapi/helper-plugin'
import assetsRequests from '../../../api/assets'

export interface IUpdateButtonProps {
    title: string
    description: string
    _public: boolean
    tags: string[]
    metadata: { key: string; value: string }[]
    id: number
    videoId: string
    update: () => void
    close: () => void
}

const UpdateButton: FC<IUpdateButtonProps> = ({
    title,
    description,
    _public,
    tags,
    metadata,
    id,
    videoId,
    update,
    close,
}): JSX.Element => {
    const [isUploading, setIsUploading] = useState(false)

    const notification = useNotification()

    const updateData = async () => {
        const body = {
            title: title,
            description: description,
            _public: _public,
            tags: tags,
            metadata: metadata,
        }
        setIsUploading(true)

        try {
            const data = await assetsRequests.update(id, videoId, body)
            if (data) {
                setIsUploading(false)
                update()
                close()
            } else {
                notification({
                    type: 'warning',
                    message: 'Error while creating video',
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    return <Button onClick={updateData}>Update</Button>
}

export default UpdateButton
