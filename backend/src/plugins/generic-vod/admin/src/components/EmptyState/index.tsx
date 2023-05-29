import React, { FC, useState } from 'react'
import { Box, Button, EmptyStateLayout } from '@strapi/design-system'
import { Plus } from '@strapi/icons'
import { Illo } from '../../assets/Illo'
import AddVideoModal from '../Modal/AddVideo'
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

interface IEmptyStateProps {
  update: () => void
}

const EmptyState: FC<IEmptyStateProps> = ({ update }) => {
  const { formatMessage } = useIntl()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Illo />}
        content={formatMessage({
          id: getTrad('emptyState')
        })}
        action={
          <Button variant="secondary" startIcon={<Plus />} onClick={() => setIsVisible(true)}>
            {
              formatMessage({ id: getTrad('emptyState.addFirstVideo') })
            }
          </Button>
        }
      />

      {isVisible && <AddVideoModal update={update} close={() => setIsVisible(false)} />}
    </Box>
  )
}

export default EmptyState
