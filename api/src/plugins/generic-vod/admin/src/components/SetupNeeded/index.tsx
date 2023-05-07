import React from 'react'
import { Box } from '@strapi/design-system/Box'
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout'
import ArrowRight from '@strapi/icons/ArrowRight'
import { Button } from '@strapi/design-system/Button'
import { Illo } from '../../assets/Illo'
import { useHistory } from 'react-router-dom'
import pluginId from '../../pluginId'

const SetupNeeded = () => {
    const history = useHistory()
    const onSettingsClick = () => {
        history.push(`/settings/${pluginId}`)
    }
    return (
        <Box padding={8} background="neutral100">
            <EmptyStateLayout
                icon={<Illo />}
                content="In order for uploads to function, an administrator will need to complete the setup of this plugin by visiting the settings page. Click the button below to be taken there now."
                action={
                    <Button variant="default" endIcon={<ArrowRight />} onClick={onSettingsClick}>
                        Go to settings
                    </Button>
                }
            />
        </Box>
    )
}

export default SetupNeeded
