import { Button } from '@strapi/design-system/Button'
import { Flex } from '@strapi/design-system/Flex'
import { IconButton } from '@strapi/design-system/IconButton'
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table'
import { Typography } from '@strapi/design-system/Typography'
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden'
import Link from '@strapi/icons/Link'
import React, { FC, useState } from 'react'
import { replacePrivateVideoTokens } from '../../../../server/utils/private-videos'
import { CustomAssets } from '../../../../types'
import assetsRequests from '../../api/assets'
import { EnhancedCustomVideo } from '../../pages/HomePage'
import { Title } from '../../styles/form'
import { copyClipboard } from '../../utils'
import { SubTitleMetadata } from '../Metadata/style'

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

    const isPrivate = !!video?.token;

    const generateToken = async () => {
        const token = (await assetsRequests.getToken(video.videoId)).token;
        setAssets(videoToAssets(await replacePrivateVideoTokens(video, token)));
    }

    return (
        <>
            <Title style={{ marginTop: '20px' }}>Links</Title>
            {isPrivate
                ? <>
                    <SubTitleMetadata>The URLs for assets of private videos can only be used once. To obtain new URLs, you can click on the button below to generate fresh links. Each time you access a private video through the Strapi Content API, a new set of private asset URLs will be generated.</SubTitleMetadata>
                    <Button onClick={() => generateToken()}>Generate new urls</Button>
                </>
                : <SubTitleMetadata>A list of links you can copy by clicking on the copy button.</SubTitleMetadata>}

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
