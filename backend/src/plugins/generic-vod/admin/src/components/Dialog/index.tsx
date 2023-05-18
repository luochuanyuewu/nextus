import React, {FC} from 'react'
import {Button, Dialog, DialogBody, DialogFooter, Flex, Stack, Typography} from '@strapi/design-system'
import {ExclamationMarkCircle, Trash} from '@strapi/icons'
import styled from 'styled-components'

interface IDialogDelete {
  title: string
  isOpen: boolean
  close: (isOpen: boolean) => void
  deleteVideo: () => void
}

const DialogDelete: FC<IDialogDelete> = ({title, isOpen, close, deleteVideo}) => {
  return (
    <Dialog onClose={close} title="Confirmation" isOpen={isOpen}>
      <DialogBody icon={<ExclamationMarkCircle/>}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description" textAlign={'center'}>
              Are you sure you want to delete the video named <Title>{title}</Title>.?
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button variant="danger-light" startIcon={<Trash/>} onClick={deleteVideo}>
            Confirm
          </Button>
        }
      />
    </Dialog>
  )
}

export default DialogDelete

const Title = styled.span`
    font-weight: bold;
`
