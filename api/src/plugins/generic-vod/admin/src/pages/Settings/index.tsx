import React, {ChangeEvent, useEffect, useState} from 'react'
import {useIntl} from 'react-intl';

import {CheckPagePermissions, useNotification, useOverlayBlocker} from '@strapi/helper-plugin'

import {Box, Button, ContentLayout, Grid, GridItem, HeaderLayout, Stack, Typography} from '@strapi/design-system'
import {Check} from '@strapi/icons'
import settingsRequests from '../../api/settings'
import FieldComp from '../../components/FieldComp/Fields'
import pluginPermissions from '../../permissions'
import getTrad from '../../utils/getTrad'
import {AliVodSettings} from "../../../../types";

const Settings = () => {
  const {formatMessage} = useIntl();

  const [settings, setSettings] = useState<AliVodSettings>({
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: '',
    regionId: '',
    cateId: "",
    storageRegion: '',
    signingKey: '',
    callbackUrl: ''
  })
  const {lockApp, unlockApp} = useOverlayBlocker()
  const notification = useNotification()

  const getSettings = async () => {
    const settings = await settingsRequests.get()
    setSettings(settings)
  }

  useEffect(() => {
    getSettings()
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, accessKeyId: event.target.value})
  }

  const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, accessKeySecret: event.target.value})
  }

  const handleRegionIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, regionId: event.target.value})
  }
  const handleEndpointChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, endpoint: event.target.value})
  }


  const handleOnSubmit = async () => {
    lockApp()
    const response = await settingsRequests.update(settings)

    if (response) {
      notification({
        type: 'success',
        message: '设置已保存。',
        // message: 'Changes saved',
      })
    } else {
      notification({
        type: 'warning',
        message: '请配置有效数据！',
        // message: 'Please enter valid settings',
      })
    }

    unlockApp()
  }

  return (
    <>
      <HeaderLayout
        title={formatMessage({
          id: getTrad('plugin.name')
        })}
        primaryAction={
          <Button type="submit" onClick={handleOnSubmit} startIcon={<Check/>} size="L">
            Save
          </Button>
        }
      />

      <ContentLayout>
        <Box
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
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Region Id"
                  label="Region Id"
                  value={settings.regionId}
                  placeholder="输入你的API接入地域标识"
                  detailsLink="https://help.aliyun.com/document_detail/98194.html"
                  onChange={handleRegionIdChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Endpoint"
                  label="Endpoint"
                  value={settings.endpoint}
                  placeholder="输入你的接入地址（访问域名）"
                  detailsLink="https://help.aliyun.com/document_detail/98194.html"
                  onChange={handleEndpointChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Storage Region"
                  label="Storage Region"
                  value={settings.storageRegion}
                  placeholder="输入你的存储地域标识"
                  detailsLink="https://help.aliyun.com/document_detail/98194.html"
                  onChange={handleEndpointChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Cate Id"
                  label="Cate Id"
                  value={settings.cateId}
                  placeholder="输入你的分类ID"
                  onChange={handleEndpointChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Signing Key"
                  label="Signing Key"
                  value={settings.signingKey}
                  placeholder="输入你的签名key"
                  onChange={handleEndpointChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="Calback Url"
                  label="Calback Url"
                  value={settings.callbackUrl}
                  placeholder="输入你的回调地址"
                  onChange={handleEndpointChange}
                />
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  )
}

export default () => (
  <CheckPagePermissions permissions={pluginPermissions.settingsRoles}>
    <Settings/>
  </CheckPagePermissions>
)
