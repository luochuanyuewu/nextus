import React, { ChangeEvent, useEffect, useState } from 'react'

import {
  CheckPagePermissions, useNotification,
  useOverlayBlocker
} from '@strapi/helper-plugin'

import { Box } from '@strapi/design-system'
import { Button } from '@strapi/design-system'
import { Grid, GridItem } from '@strapi/design-system'
import { ContentLayout, HeaderLayout } from '@strapi/design-system'
import { Stack } from '@strapi/design-system'
import { Typography } from '@strapi/design-system'
import { Check } from '@strapi/icons'
import settingsRequests from '../../api/settings'
import FieldComp from '../../components/FieldComp/Fields'
import pluginPermissions from '../../permissions'
import getTrad from '../../utils/getTrad'
import { AliVodSettings } from "../../../../types";

const Settings = () => {


  const [settings, setSettings] = useState<AliVodSettings>({
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: '',
    regionId: ''
  })
  const { lockApp, unlockApp } = useOverlayBlocker()
  const notification = useNotification()

  const getSettings = async () => {
    const settings = await settingsRequests.get()
    setSettings(settings)
  }

  useEffect(() => {
    getSettings()
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, accessKeyId: event.target.value })
  }

  const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, accessKeySecret: event.target.value })
  }

  const handleOnSubmit = async () => {
    lockApp()
    const response = await settingsRequests.update(settings)

    if (response) {
      notification({
        type: 'success',
        message: 'Changes saved',
      })
    } else {
      notification({
        type: 'warning',
        message: 'Please enter valid settings',
      })
    }

    unlockApp()
  }

  return (
    <>
      <HeaderLayout
        title={getTrad('plugin.name')}
        primaryAction={
          <Button type="submit" onClick={handleOnSubmit} startIcon={<Check />} size="L">
            Save
          </Button>
        }
      />

      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Stack size={4}>
            <Typography variant="delta" as="h2">
              Settings
            </Typography>
            <Grid gap={6}>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="API Key"
                  label="API Key"
                  value={settings.accessKeyId}
                  placeholder="输入你的 AccessKeyId"
                  description="在阿里云控制台创建访问密钥"
                  detailsLink="https://help.aliyun.com/document_detail/116401.html?spm=a2c4g.116401.0.0.60e73669VvRy5H"
                  isPassword
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="API Key Secret"
                  label="API Key Secret"
                  value={settings.accessKeySecret}
                  placeholder="输入你的 AccessKeySecret"
                  isPassword
                  onChange={handleSecretChange}
                />
              </GridItem>
              {/* <GridItem col={12} s={12}>
                                <Toggle
                                    label="Default Video Privacy"
                                    checked={settings.defaultPublic}
                                    required={true}
                                    onLabel="Public"
                                    offLabel="Private"
                                    onChange={handleSetPublic}
                                />
                            </GridItem> */}
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  )
}

export default () => (
  <CheckPagePermissions permissions={pluginPermissions.settingsRoles}>
    <Settings />
  </CheckPagePermissions>
)
