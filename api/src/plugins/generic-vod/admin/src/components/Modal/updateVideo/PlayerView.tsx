import ApiVideoReactPlayer from '@api.video/react-player'
import React, { FC } from 'react'
import styled from 'styled-components'
import { EnhancedCustomVideo } from '../../../pages/HomePage'

interface IPlayerViewProps {
    video: EnhancedCustomVideo
}

const PlayerView: FC<IPlayerViewProps> = ({ video }) => {
    const { videoId, token, privateSession } = video

    return (
        <Wrapper>
            <ApiVideoReactPlayer
                video={video._public ? { id: videoId } : { id: videoId, token, privateSession }}
                videoStyleObjectFit={'cover'}

                style={{
                    width: 'auto',
                    height: 300,
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
            ></ApiVideoReactPlayer>
        </Wrapper>
    )
}

export default PlayerView

const Wrapper = styled.div`
    border-radius: 4px;
    padding-bottom: 10px;
`