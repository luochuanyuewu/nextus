
import React, { useEffect, useState } from "react";

export interface IAliPlayerProps {
  source?: string | undefined
  vid?: string | undefined
  playauth?: string | undefined
  encryptType?: number
  autoPlay?: boolean
  isLive?: boolean
  preload?: boolean
  controlBarVisibility?: string
  rePlay?: boolean
  useH5Prism?: boolean
  qualitySort?: string
  definition?: string
  defaultDefinition?: string
}


const AliPlayer = function ({
  source,
  vid,
  playauth,
  encryptType,
  autoPlay = true,
  preload = true,
  controlBarVisibility = 'hover',
  rePlay = true,
  useH5Prism = true,
  qualitySort = 'desc',
  definition = 'FD,LD,SD',
  defaultDefinition = "SD"
}: IAliPlayerProps) {


  const createPlayer = () => {
    return new (window as any).Aliplayer({
      id: 'player',
      source,
      vid,
      playauth,
      encryptType,
      autoPlay,
      preload,
      controlBarVisibility,
      rePlay,
      useH5Prism,
      qualitySort,
      // definition,
      // defaultDefinition,
      skinLayout: [
        // { name: 'bigPlayButton', align: 'blabs', x: 30, y: 80 },
        {
          name: 'H5Loading',
          align: 'cc',
        },
        { name: 'errorDisplay', align: 'tlabs', x: 0, y: 0 },
        { name: 'infoDisplay' },
        { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
        // { name: 'thumbnail' },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: 0,
          children: [
            { name: 'progress', align: 'blabs', x: 0, y: 44 },
            { name: 'playButton', align: 'tl', x: 15, y: 12 },
            { name: 'timeDisplay', align: 'tl', x: 10, y: 7 },
            { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
            // { name: 'subtitle', align: 'tr', x: 15, y: 12 },
            { name: 'setting', align: 'tr', x: 15, y: 12 },
            { name: 'volume', align: 'tr', x: 5, y: 10 },
          ],
        },
      ],
    }, (player: any) => {
      console.log("创建播放器:" + player)
    })
  }


  let player: any


  useEffect(() => {
    // let c = document.querySelector("#AliPlayerStyle")
    // c && c.parentNode?.removeChild(c)
    //
    //
    // let s = document.querySelector("#AliPlayer");
    // s && s.parentNode?.removeChild(s);
    //
    // let style = document.createElement("link")
    // style.id = "AliPlayerStyle"
    // style.rel = "stylesheet"
    // style.href = "https://g.alicdn.com/de/prismplayer/2.15.2/skins/default/aliplayer-min.css"
    // document.head.appendChild(style)
    //
    // let script = document.createElement("script");
    // script.id = "AliPlayer";
    // script.type = "text/javascript"
    // script.src = 'https://g.alicdn.com/de/prismplayer/2.15.2/aliplayer-min.js';
    // document.head.appendChild(script)
    player = createPlayer()

    return () => {
      if (player) {
        console.log("销毁播放器")
        player.dispose()
        player = null
      }
    }

  }, [])

  return (
    <div id="player">
      {/*在<body>标签处添加一个用以挂载播放界面的<div>节点*/}
    </div>
  )
}


export default AliPlayer
