import React, { FC, useState } from 'react'
import { Container } from './style'
import { Tag } from '@strapi/design-system/Tag'
import Cross from '@strapi/icons/Cross'
import { CustomBadge, FormInput, SubTitle, Title } from '../../styles/form'

interface ITag {
    tags: string[]
    handleSetTag: (tag: string) => void
    handleRemoveTag: (tag: string) => void
    editable: boolean
}

const Tags: FC<ITag> = ({ tags, handleSetTag, handleRemoveTag, editable }) => {
    const [tag, setTag] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = tag.trim()
        const hasValue = value.length > 0
        if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
            e.preventDefault()
            if (!hasValue) return
            if (tags.some((item) => item === value)) {
                return
            }
            handleSetTag(value)
            setTag('')
        }
    }
    return (
        <>
            <Title>
                Tags
                <CustomBadge active={tags.length > 0}>{tags.length}</CustomBadge>
            </Title>
            <SubTitle>A list of tags you want to use to describe your video.</SubTitle>
            <Container>
                {editable && (
                    <FormInput
                        placeholder="Add a tag"
                        value={tag}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    ></FormInput>
                )}

                {tags.map((item) => {
                    return (
                        <Tag
                            key={item}
                            onClick={editable ? () => handleRemoveTag(item) : undefined}
                            icon={<Cross aria-hidden={true} />}
                        >
                            {item}
                        </Tag>
                    )
                })}
            </Container>
        </>
    )
}

export default Tags
