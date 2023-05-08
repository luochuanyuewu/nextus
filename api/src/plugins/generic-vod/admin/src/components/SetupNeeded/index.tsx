import React from 'react'
import {Box, Button, EmptyStateLayout} from '@strapi/design-system'
import {ArrowRight} from '@strapi/icons'
import {Illo} from '../../assets/Illo'
import {useHistory} from 'react-router-dom'
import pluginId from '../../pluginId'
import getTrad from "../../utils/getTrad";
import {useIntl} from 'react-intl';


const SetupNeeded = () => {
  const {formatMessage} = useIntl();

  const history = useHistory()
  const onSettingsClick = () => {
    history.push(`/settings/${pluginId}`)
  }
  return (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Illo/>}
        content={formatMessage({
          id: getTrad('setupRequired')
        })}
        action={
          <Button variant="default" endIcon={<ArrowRight/>} onClick={onSettingsClick}>
            Go to settings
          </Button>
        }
      />
    </Box>
  )
}

export default SetupNeeded
