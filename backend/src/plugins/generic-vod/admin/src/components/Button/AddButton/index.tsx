import React, { FC, useState } from 'react'
import { Button } from '@strapi/design-system'

import { Plus } from '@strapi/icons'
import AddVideoModal from '../../Modal/AddVideo'
import getTrad from '../../../utils/getTrad'
import { useIntl } from 'react-intl'

interface IAddButtonProps {
  update: () => void
}

const AddButton = ({ update }: IAddButtonProps) => {
  const { formatMessage } = useIntl()

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button endIcon={<Plus />} onClick={() => setIsVisible(true)}>
        {
          formatMessage({ id: getTrad('addButton.addVideo') })
        }
      </Button>
      {isVisible && <AddVideoModal update={update} close={() => setIsVisible(false)} />}
    </>
  )
}

export default AddButton
