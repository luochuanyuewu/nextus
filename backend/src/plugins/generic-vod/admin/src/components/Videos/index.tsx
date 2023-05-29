import { Trash } from '@strapi/icons'
import React, { FC, useEffect, useRef, useState } from 'react'
import assetsRequests from '../../api/assets'
import { EnhancedCustomVideo } from '../../pages/HomePage'
import { getDayMonthYearHourDate } from '../../utils/date'
import DialogDelete from '../Dialog'
import UpdateVideoModal from '../Modal/UpdateVideo'
import { Container, DateStyle, DeleteIcon, SubTitle, Thumbnail, Title, TitleWrapper, WrapperVideo } from './styles'
import { CustomVideo } from '../../../../types'

export interface IVideosProps {
  video: CustomVideo
  updateData: () => void
  editable: boolean
  deletable: boolean
}

const VideoView = ({ video, updateData, deletable, editable }: IVideosProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [token, setToken] = useState<string>()

  const deleteVideo = async () => {
    await assetsRequests.delete(video.id, video.videoId)
    setIsDeleteDialogOpen(false)
    updateData()
  }

  const openDeleteDialog = (e: React.ChangeEvent<any>) => {
    e.stopPropagation()
    setIsDeleteDialogOpen(true)
  }
  const formatedCreatedAt = getDayMonthYearHourDate(video.createdAt)


  return (
    <Container>
      <WrapperVideo onClick={() => setIsModalOpen(true)}>
        {video.thumbnail ? (
          <Thumbnail src={video.thumbnail} alt={'thumbnail'} />
        ) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" /></svg>)}
        {deletable && <DeleteIcon onClick={openDeleteDialog} aria-label="Delete" icon={<Trash />} />}
      </WrapperVideo>

      <TitleWrapper>
        <Title>{video.title}</Title>
        <SubTitle>{video.description}</SubTitle>
        <DateStyle>{formatedCreatedAt}</DateStyle>
      </TitleWrapper>

      {isModalOpen && (
        <UpdateVideoModal
          video={video as EnhancedCustomVideo}
          update={updateData}
          editable={editable}
          close={() => setIsModalOpen(false)}
        />
      )}
      {isDeleteDialogOpen && (
        <DialogDelete
          title={video.title}
          isOpen={isDeleteDialogOpen}
          close={() => setIsDeleteDialogOpen(false)}
          deleteVideo={deleteVideo}
        />
      )}
    </Container>
  )
}

export default VideoView
