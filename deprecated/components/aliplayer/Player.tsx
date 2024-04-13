'use client'
import * as React from 'react'
import { useState, useEffect, useRef, useImperativeHandle } from 'react'

import type {
  PlayerProps,
  PlayerConfig,
  PlayerInstance,
  PlayerRef,
} from './types'

const playerScriptId = 'ali-player-js'
const playerLinkId = 'ali-player-css'
const tempPrefix = '//g.alicdn.com/de/prismplayer/{%version}/'
const eventNames = [
  'ready',
  'play',
  'pause',
  'canplay',
  'playing',
  'ended',
  'hideBar',
  'showBar',
  'waiting',
  'snapshoted',
  'timeupdate',
  'onM3u8Retry',
  'liveStreamStop',
  'cancelFullScreen',
  'requestFullScreen',
  'error',
]

const InternalPlayer: React.ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
  props,
  ref
) => {
  const {
    prefixCls = 'pansy-aliplayer',
    className,
    style,
    hideControlbar = false,
    options = {},
    loading,
    source,
    isLive,
    version = '2.15.2',
    cssLinkTemplate = `${tempPrefix}skins/default/aliplayer-min.css`,
    scriptSrcTemplate = `${tempPrefix}aliplayer-min.js`,
  } = props
  const playerInstance = useRef<PlayerInstance>()
  const playerId = useRef(`aliplayer`)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    insertLinkTag()
    init()

    return () => {
      playerInstance.current && playerInstance.current.dispose()
    }
  }, [])

  useEffect(() => {
    if (playerInstance.current && props.source) {
      playerInstance.current.loadByUrl(props.source)
    }
  }, [props.source, playerInstance.current])

  useImperativeHandle(
    ref,
    () => {
      return {
        getInstance: () => playerInstance.current!,
      }
    },
    [playerInstance.current]
  )

  const classes = [
    prefixCls,
    className,
    'prism-player',
    hideControlbar ? 'hide-controlbar' : null,
  ]
    .filter((item) => item)
    .join(' ')
    .trim()

  const getPath = (path: string, version: string): string => {
    return path.replace(/\{([^{]*?)%version(.*?)\}/g, version.toString())
  }

  const insertLinkTag = () => {
    const playerLinkTag = document.getElementById(playerLinkId)

    if (!playerLinkTag && version && cssLinkTemplate) {
      const link = document.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = getPath(cssLinkTemplate, version)
      link.id = playerLinkId
      document.head.appendChild(link)
    }
  }

  const insertScriptTag = () => {
    let playerScriptTag = document.getElementById(
      playerScriptId
    ) as HTMLScriptElement

    if (!playerScriptTag) {
      playerScriptTag = document.createElement('script')
      playerScriptTag.type = 'text/javascript'
      playerScriptTag.charset = 'utf-8'
      playerScriptTag.src = getPath(scriptSrcTemplate, version)
      playerScriptTag.id = playerScriptId

      document.body.appendChild(playerScriptTag)
    }

    playerScriptTag.addEventListener('load', () => {
      setIsLoading(false)
      initAliPlayer()
    })
  }

  const init = () => {
    if (window['Aliplayer']) {
      setIsLoading(false)
      initAliPlayer()
    } else {
      insertScriptTag()
    }
  }

  const initAliPlayer = () => {
    const config: Partial<PlayerConfig> = {
      ...options,
      useH5Prism: true,
      id: playerId.current,
      source,
      isLive: !!isLive,
    }

    if (!config.width) {
      config.width = '100%'
    }

    if (!config.height) {
      config.height = '100%'
    }

    if (config.autoplay === undefined) {
      config.autoplay = false
    }

    if (playerInstance.current) {
      playerInstance.current.dispose()
    }

    // @ts-ignore
    const Aliplayer = window['Aliplayer'] || window['proxy']?.Aliplayer

    playerInstance.current = new Aliplayer(config)
    // playerInstance.current!.setVolume(0);
    initEvents(playerInstance.current)
  }

  const initEvents = (player?: PlayerInstance) => {
    if (!player) return
    eventNames.forEach((eventName) => {
      let propsEventName = eventName
      if (!eventName.startsWith('on')) {
        propsEventName = `on${eventName
          .charAt(0)
          .toUpperCase()}${eventName.slice(1, eventName.length)}`
      }

      // @ts-ignore
      if (propsEventName in props && props[propsEventName]) {
        // @ts-ignore
        player.on(eventName, props[propsEventName])
      }
    })
  }

  return (
    <div className={classes} style={style} id={playerId.current}>
      {isLoading ? loading : null}
    </div>
  )
}

export const Player = React.forwardRef<any, PlayerProps>(InternalPlayer)
