import {Trash} from '@strapi/icons'
import React, {FC, useEffect, useRef, useState} from 'react'
import assetsRequests from '../../api/assets'
import {EnhancedCustomVideo} from '../../pages/HomePage'
import {getDayMonthYearHourDate} from '../../utils/date'
import DialogDelete from '../Dialog'
import UpdateVideoModal from '../Modal/updateVideo'
import {Container, DateStyle, DeleteIcon, SubTitle, Thumbnail, Title, TitleWrapper, WrapperVideo} from './styles'

export interface IVideosProps {
  video: EnhancedCustomVideo
  updateData: () => void
  editable: boolean
  deletable: boolean
}

const VideoView: FC<IVideosProps> = ({video, updateData, deletable, editable}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [thumbnail, setThumbnail] = useState<string>()
  const thumbnailTimout = useRef<any>(0)

  useEffect(() => {
    const fetchThumbnail = async () => {
      const fetchRes = await fetch(video.thumbnail);

      if (fetchRes.status === 200) {
        setThumbnail(URL.createObjectURL(await fetchRes.blob()));
        return;
      }

      thumbnailTimout.current = setTimeout(() => fetchThumbnail(), 1000);
    }

    setThumbnail(undefined);

    fetchThumbnail();

    return () => {
      setTimeout(() => {
        if (thumbnailTimout.current) clearTimeout(thumbnailTimout.current);
      }, 1000);
    }
  }, [video])


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
        {thumbnail ? (
          <Thumbnail src='https://letsgit.com/avatars/613adb8d9e74e5aa2ba95d42f8f615e3?size=84' alt={'thumbnail'}/>
        ) : (<Thumbnail src='https://letsgit.com/avatars/613adb8d9e74e5aa2ba95d42f8f615e3?size=84' alt={'thumbnail'}/>)}
        {deletable && <DeleteIcon onClick={openDeleteDialog} aria-label="Delete" icon={<Trash/>}/>}
      </WrapperVideo>

      <TitleWrapper>
        <Title>{video.title}</Title>
        <SubTitle>{video.description}</SubTitle>
        <DateStyle>{formatedCreatedAt}</DateStyle>
      </TitleWrapper>

      {isModalOpen && (
        <UpdateVideoModal
          video={video}
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
