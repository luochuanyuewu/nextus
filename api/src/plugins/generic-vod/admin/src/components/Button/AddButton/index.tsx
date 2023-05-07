import React, { useState, FC } from 'react'
import { Button } from '@strapi/design-system/Button'

import Plus from '@strapi/icons/Plus'
import AddVideoModal from '../../Modal/AddVideo'

interface IAddButtonProps {
    update: () => void
}

const AddButton: FC<IAddButtonProps> = ({ update }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <Button endIcon={<Plus />} onClick={() => setIsVisible(true)}>
                Add a video
            </Button>
            {isVisible && <AddVideoModal update={update} close={() => setIsVisible(false)} />}
        </>
    )
}

export default AddButton
