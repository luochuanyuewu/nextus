import { Button } from '@strapi/design-system'
import { ModalBody, ModalFooter, ModalHeader, ModalLayout } from '@strapi/design-system'
import { Typography } from '@strapi/design-system'
import React, { ChangeEvent, FC, useState } from 'react'
import { EnhancedCustomVideo } from '../../../pages/HomePage'
import UpdateButton from '../../Button/UpdateButton'
import FieldComp from '../../FieldComp/Fields'
import LinksTable from '../../LinksTable'
import MetadataTable from '../../Metadata'
import Tags from '../../Tags'
import Toggle from '../../Toggle'
import PlayerView from './PlayerView'
import { InputData } from '../../../../../types'

interface IUpdateVideoModalProps {
    video: EnhancedCustomVideo
    update: () => void
    close: () => void
    editable: boolean
}

const UpdateVideoModal: FC<IUpdateVideoModalProps> = ({ video, update, close, editable }): JSX.Element => {
    const [inputData, setInputData] = useState<InputData>({
        title: video.title,
        description: video.description,
        _public: video._public,
        tags: video.tags,
        metadata: video.metadata,
    })

    // CONSTANTS
    const { title, description, _public, tags, metadata } = inputData

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }))
    }

    const handleSetPublic = (event: ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, _public: event.target.checked })
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

    return (
        <ModalLayout onClose={close} labelledBy="title">
            <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                    Update video
                </Typography>
            </ModalHeader>
            <ModalBody>
                <PlayerView video={video} />
                <FieldComp
                    name="title"
                    label="Title"
                    value={title}
                    placeholder="Enter your title"
                    onChange={handleChange}
                    editable={editable}
                    required
                />
                <br />
                <FieldComp
                    name="description"
                    label="Description"
                    value={description || ''}
                    placeholder="Enter a description"
                    onChange={handleChange}
                    editable={editable}
                />
                <br />

                <Toggle
                    label="Public"
                    required={true}
                    checked={inputData._public}
                    onLabel="True"
                    offLabel="False"
                    onChange={handleSetPublic}
                />
                <br />

                <Tags
                    handleSetTag={handleSetTag}
                    handleRemoveTag={handleRemoveTag}
                    tags={tags || []}
                    editable={editable}
                />

                <MetadataTable
                    metadata={metadata}
                    handleSetMetadata={handleSetMetadata}
                    handleRemoveMetadata={handleRemoveMetadata}
                    editable={editable}
                />

                <LinksTable video={video} />
            </ModalBody>
            <ModalFooter
                startActions={
                    <Button onClick={close} variant="tertiary">
                        Cancel
                    </Button>
                }
                endActions={
                    editable && (
                        <>
                            <UpdateButton
                                title={title}
                                description={description || ''}
                                _public={_public}
                                tags={tags || []}
                                metadata={metadata || []}
                                id={video.id}
                                videoId={video.videoId}
                                update={update}
                                close={close}
                            />
                        </>
                    )
                }
            />
        </ModalLayout>
    )
}

export default UpdateVideoModal
