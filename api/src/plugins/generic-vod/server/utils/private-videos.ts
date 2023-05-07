import {CustomVideo} from "../../types";


export const replacePrivateVideoTokens = async (video: CustomVideo, token?: string) => {
  if (video._public) {
    return video;
  }

  // @ts-ignore
  token = token ?? (await strapi.plugin('generic-vod').service('vod-asset').token(video.videoId)).token;

  return {
    ...video,
    mp4: video.mp4.replace(/token\/[\w-]+\//, `token/${token}/`),
    thumbnail: video.thumbnail.replace(/token\/[\w-]+\//, `token/${token}/`),
    hls: video.hls.replace(/token\/[\w-]+\//, `token/${token}/`),
    iframe: video.iframe.replace(/token=[\w-]+/, `token=${token}`),
    player: video.player.replace(/token=[\w-]+/, `token=${token}`),
  }
}
