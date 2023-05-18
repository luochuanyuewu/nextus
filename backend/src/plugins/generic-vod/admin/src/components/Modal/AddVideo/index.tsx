import React, { ChangeEvent, FC, useRef, useState } from 'react'
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography,
  ActionLayout,
} from '@strapi/design-system'
import FieldComp from '../../FieldComp/Fields'
import ImportZone from './importZone'
import Tags from '../../Tags'

import MetadataTable from '../../Metadata'
import { InputData } from '../../../../../types'
import AliUploadButton from "../../Button/AliUploadButton";


interface IAddVideoModalProps {
  close: () => void
  update: () => void
}

const AddVideoModal = ({ update, close }: IAddVideoModalProps) => {
  const [inputData, setInputData] = useState<InputData>({
    title: '',
    description: '',
    fileName: '',
    tags: [],
    metadata: [
      {
        key: 'Upload source',
        value: 'Strapi',
      },
    ],
  })

  const uploadButton = useRef()

  const cancelUpload = () => {

  }

  const [file, setFile] = useState<File | undefined>()
  const [initialState, setInitialState] = useState<number>(0)

  // CONSTANTS
  const videoRef = useRef<HTMLVideoElement>(null)
  const sourceRef = useRef<HTMLSourceElement>(null)
  const { title, description, fileName, tags, metadata } = inputData

  const displayVideoFrame = (video: HTMLVideoElement, source: HTMLSourceElement, file: File) => {
    // Object Url as the video source
    source.setAttribute('src', URL.createObjectURL(file))
    // Load the video and show it
    video.load()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }))
  }

  const handleSetTag = (tag: string) => {
    if (tag) {
      setInputData({ ...inputData, tags: [...(inputData.tags || []), tag] })
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = inputData.tags && inputData.tags.filter((t) => t !== tag)
    setInputData({ ...inputData, tags: newTags })
  }

  const handleSetMetadata = (metadata: any) => {
    if (metadata) {
      setInputData({
        ...inputData,
        metadata: [...(inputData.metadata || []), metadata],
      })
    }
  }

  const handleRemoveMetadata = (metadata: Object) => {
    const newMetadata = inputData?.metadata && inputData?.metadata.filter((m) => m !== metadata)
    setInputData({ ...inputData, metadata: newMetadata })
  }

  const onFileSelected = (file: File) => {
    console.log(file, 'file')
    setFile(file)
    setInputData((prevInputData) => ({
      ...prevInputData,
      title: file.name.replace(/\.[^/.]+$/, ''),
    }))
    if (initialState === 0) {
      setInitialState(1)
    }
    if (videoRef.current && sourceRef.current) displayVideoFrame(videoRef.current, sourceRef.current, file)
  }

  // useEffect(() => {
  //     getSettings()
  // }, [])

  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Upload a video
        </Typography>
      </ModalHeader>
      <ModalBody>
        <ImportZone
          initialState={initialState}
          onFileSelected={onFileSelected}
          videoRef={videoRef}
          sourceRef={sourceRef}
        />
        <FieldComp
          name="title"
          label="Title"
          value={title}
          placeholder="Enter your title"
          onChange={handleChange}
          required
        />
        <br />
        <FieldComp
          name="description"
          label="Description"
          value={description || ''}
          placeholder="Enter a description"
          onChange={handleChange}
        />
        <br />


        <Tags handleSetTag={handleSetTag} handleRemoveTag={handleRemoveTag} tags={tags || []} editable={true} />

        <MetadataTable
          metadata={metadata}
          handleSetMetadata={handleSetMetadata}
          handleRemoveMetadata={handleRemoveMetadata}
          editable={true}
        />

      </ModalBody>
      <ActionLayout />
      <ModalFooter
        startActions={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <AliUploadButton
              currentFile={file}
              title={title}
              description={description || ''}
              tags={tags || []}
              metadata={metadata || []}
              onUploadSucceed={update}
              onUploadEnd={close}
            />
          </>
        }
      />
    </ModalLayout>
  )
}

export default AddVideoModal
