import React, { FC, useState, useRef } from 'react'
import styled from 'styled-components'
import { VideoCover } from '../../../assets/VideoCover'
import { useNotification } from '@strapi/helper-plugin'

interface IImportZoneProps {
    initialState: number
    onFileSelected: (file: File) => void
    videoRef: React.RefObject<HTMLVideoElement>
    sourceRef: React.RefObject<HTMLSourceElement>
}

const ImportZone: FC<IImportZoneProps> = ({ initialState, onFileSelected, videoRef, sourceRef }) => {
    const inputFile = useRef<HTMLInputElement | null>(null)
    const notification = useNotification()
    const [file, setFile] = useState<File | undefined>()

    const openFilePicker = () => {
        if (file) {
            setFile(undefined)
        }
        inputFile && inputFile?.current?.click()
    }

    const fileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files && files.length > 0) {
            onFileSelected(files[0])
        }
    }

    const onFileDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault()

        let file: File | null = null

        if (ev.dataTransfer.items) {
            if (ev.dataTransfer.items.length > 1) {
                notification({
                    type: 'warning',
                    message: 'Only one file is allowed',
                })
                return
            }

            const item = ev.dataTransfer.items[0]

            if (item.kind === 'file') {
                file = item.getAsFile()!
            }
        } else if (ev.dataTransfer.files) {
            if (ev.dataTransfer.files.length > 1) {
                notification({
                    type: 'warning',
                    message: 'Only one file is allowed',
                })
                return
            }

            file = ev.dataTransfer.files[0]
        }

        if (file) {
            if (!file.type.startsWith('video/')) {
                notification({
                    type: 'warning',
                    message: 'Only video files are allowed',
                })
                return
            }
            onFileSelected(file)
        }
    }

    return (
        <Wrapper onDrop={onFileDrop} onDragOver={(e) => e.preventDefault()} onClick={openFilePicker}>
            {initialState === 0 && <VideoCover />}

            <ThumbnailImg isShowed={initialState === 1}>
                <video ref={videoRef}>
                    <source ref={sourceRef} />
                </video>
            </ThumbnailImg>
            <Title>
                Select a video<Asterisk>*</Asterisk> file to upload
            </Title>
            <Subtitle>or drag and drop it here</Subtitle>
            <input
                type="file"
                id="upload"
                accept={'video/*'}
                ref={inputFile}
                name="upload"
                onChange={(e) => fileInputChange(e)}
                style={{ display: 'none' }}
            />
        </Wrapper>
    )
}

export default ImportZone

const UploadImage = styled.img`
    width: 200px;
    height: auto;
    opacity: 0.4;
    transition: opacity 0.4s ease-in-out;
`

export const ThumbnailImg = styled.div<{ isShowed: boolean }>`
    height: ${(props) => (props.isShowed ? '150px' : '0px')};
    border-radius: 4px;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    visibility: ${(props) => (props.isShowed ? 'visible' : 'hidden')};
    video {
        height: 100%;
        border-radius: 4px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    border: 1px dashed #eaeaea;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border 0.4s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        border: 1px dashed #4642eb;
    }

    &:hover ${UploadImage} {
        opacity: 0.8;
    }
`

const Title = styled.p`
    font-size: 24px;
    font-weight: 600;
    padding: 20px 0 10px 0;
    color: #32324d;
`

const Subtitle = styled.p`
    font-size: 16px;
    color: #666687;
`

const Asterisk = styled.span`
    color: red;
`
