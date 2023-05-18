import { Flex, IconButton, Table, Tbody, Td, Th, Thead, Tr, Typography, VisuallyHidden } from '@strapi/design-system'
import { Link } from '@strapi/icons'
import React, { FC, useState } from 'react'
import { CustomAssets } from '../../../../types'
import { EnhancedCustomVideo } from '../../pages/HomePage'
import { Title } from '../../styles/form'
import { copyClipboard } from '../../utils'

interface LinksProps {
  video: EnhancedCustomVideo
}

const videoToAssets = (video: EnhancedCustomVideo): CustomAssets => {
  const assets = {
    hls: video.hls,
    iframe: video.iframe,
    mp4: video.mp4,
    player: video.player,
  }
  return assets
}


const LinksTable: FC<LinksProps> = ({ video }) => {

  const [assets, setAssets] = useState<CustomAssets | undefined>(!!video?.token ? undefined : videoToAssets(video))
  const COL_COUNT = 4
  const ROW_COUNT = 2

  return (
    <>
      <Title style={{ marginTop: '20px' }}>Links</Title>
      {assets && (
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">Type</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Link</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Copy</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(assets).map((links, index) => (
              <Tr key={index}>
                <Td>
                  <Typography textColor="neutral800">{links[0]}</Typography>
                </Td>
                <Td
                  style={{
                    flex: '1',
                    overflow: 'hidden',
                    maxWidth: '50ch',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography textColor="neutral800">{links[1]}</Typography>
                </Td>
                <Td>
                  <Flex justifyContent={'flex-end'}>
                    <IconButton
                      onClick={() => copyClipboard(links[1])}
                      label={'Copy'}
                      noBorder
                      icon={<Link />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  )
}

export default LinksTable
