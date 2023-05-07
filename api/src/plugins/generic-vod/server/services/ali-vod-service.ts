import {Strapi} from '@strapi/strapi';
import {configClient} from "../utils/config";
import {
  CreateUploadVideoRequest,
  GetPlayInfoRequest,
  GetPlayInfoResponse,
  GetVideoPlayAuthRequest,
  GetVideoPlayAuthResponse
} from "@alicloud/vod20170321";

import Util, * as $Util from '@alicloud/tea-util';

export default ({strapi}: { strapi: Strapi }) => ({
  async createUploadVideo(title: string, fileName: string) {
    const client = await configClient(strapi)

    let createUploadVideoRequest = new CreateUploadVideoRequest({
      title,
      fileName
    });
    let runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await client.createUploadVideoWithOptions(createUploadVideoRequest, runtime);
      return res.body
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  },


  async getPlayerInfo(VideoId: string) {
    try {
      const client = await configClient(strapi)

      const request = new GetPlayInfoRequest()
      request.videoId = VideoId;

      const response: GetPlayInfoResponse = await client.getPlayInfo(request)
      // Play URL
      if (response.PlayInfoList && response.PlayInfoList.PlayInfo && response.PlayInfoList.PlayInfo.length > 0) {
        for (let i = 0; i < response.PlayInfoList.PlayInfo.length; i++) {
          console.log("PlayInfo.PlayURL = " + response.PlayInfoList.PlayInfo[i].PlayURL);
        }
      }

      // Base metadata
      if (response.VideoBase) {
        console.log('VideoBase.Title = ' + response.VideoBase.Title);
      }

      console.log('RequestId = ' + response.RequestId);
    } catch (error) {
      console.log('ErrorCode = ' + error.data.Code);
      console.log('ErrorMessage = ' + error.data.Message);
      console.log('RequestId = ' + error.data.RequestId);
    }
  },

  async getVideoPlayAuth(VideoId: string) {
    const client = await configClient(strapi)

    try {

      const response: GetVideoPlayAuthResponse = await client.getVideoPlayAuth(new GetVideoPlayAuthRequest({videoId: VideoId}));

      // Play Auth
      console.log('PlayAuth = ' + response.body.playAuth);

      // Base metadata
      if (response.VideoMeta) {
        console.log('VideoMeta.Title = ' + response.body.videoMeta?.Title);
      }
      console.log('RequestId = ' + response.body.requestId);
      return response.body.playAuth
    } catch (error) {
      console.log('ErrorCode = ' + error.data.Code);
      console.log('ErrorMessage = ' + error.data.Message);
      console.log('RequestId = ' + error.data.RequestId);
      return ''
    }
  }

});
