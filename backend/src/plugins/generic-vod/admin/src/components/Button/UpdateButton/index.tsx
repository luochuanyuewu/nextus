import React, { FC, useState } from 'react'
import { Button } from '@strapi/design-system'
import { useNotification } from '@strapi/helper-plugin'
import assetsRequests from '../../../api/assets'
import { InputData } from "../../../../../types";
import getTrad from '../../../utils/getTrad';

export interface IUpdateButtonProps {
  title: string
  description: string
  tags: string[]
  metadata: { key: string; value: string }[]
  id: number
  videoId: string
  update: () => void
  close: () => void
}

const UpdateButton = ({
  title,
  description,
  tags,
  metadata,
  id,
  videoId,
  update,
  close,
}: IUpdateButtonProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const notification = useNotification()

  const updateData = async () => {
    const body: InputData = {
      title: title,
      description: description,
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
          message: getTrad("video.updateFailed"),
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return <Button onClick={updateData}>Update</Button>
}

export default UpdateButton