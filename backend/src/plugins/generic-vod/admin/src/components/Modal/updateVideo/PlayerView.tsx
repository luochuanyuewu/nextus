import React from 'react'
import styled from 'styled-components'
import { EnhancedCustomVideo } from '../../../pages/HomePage'
import Player from '../../AliPlayer'

interface IPlayerViewProps {
  video: EnhancedCustomVideo
}

const PlayerView = ({ video }: IPlayerViewProps) => {
  return (
    <Wrapper>
      <Player options={{
        vid: video.videoId, playauth: video.playAuth, autoplay: true
      }}></Player>
    </Wrapper>
  )
}

export default PlayerView

const Wrapper = styled.div`
  border-radius: 4px;
  padding-bottom: 10px;
  aspect-ratio: 16 / 9;
`
