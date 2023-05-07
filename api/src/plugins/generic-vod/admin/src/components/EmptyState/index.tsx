import React, { useState, FC } from 'react'
import { Box } from '@strapi/design-system/Box'
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout'
import Plus from '@strapi/icons/Plus'
import { Button } from '@strapi/design-system/Button'
import { Illo } from '../../assets/Illo'
import AddVideoModal from '../Modal/AddVideo'

interface IEmptyStateProps {
    update: () => void
}

const EmptyState: FC<IEmptyStateProps> = ({ update }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <Box padding={8} background="neutral100">
            <EmptyStateLayout
                icon={<Illo />}
                content="You don't have any videos yet"
                action={
                    <Button variant="secondary" startIcon={<Plus />} onClick={() => setIsVisible(true)}>
                        Add your first videos
                    </Button>
                }
            />

            {isVisible && <AddVideoModal update={update} close={() => setIsVisible(false)} />}
        </Box>
    )
}

export default EmptyState
