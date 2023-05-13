import {Strapi} from '@strapi/strapi';
import {configClient} from "../utils/config";
import {
  CreateUploadVideoRequest,
  DeleteVideoRequest,
  GetPlayInfoRequest,
  GetPlayInfoResponse,
  GetVideoPlayAuthRequest,
  GetVideoPlayAuthResponse,
  RefreshUploadVideoRequest,
  UpdateVideoInfoRequest
} from "@alicloud/vod20170321";

import Util, * as $Util from '@alicloud/tea-util';
import {CustomVideo, InputData} from "../../types";
import pluginId from "../../admin/src/pluginId";


const model = `plugin::${pluginId}.vod-asset`

export default ({strapi}: { strapi: Strapi }) => ({
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

    try {
      const client = await configClient(strapi)

      const response: GetVideoPlayAuthResponse = await client.getVideoPlayAuth(new GetVideoPlayAuthRequest({videoId: VideoId}));

      // Base metadata
      if (response.VideoMeta) {
        console.log('VideoMeta.Title = ' + response.body.videoMeta?.Title);
        // response.body.videoMeta.coverURL
      }
      console.log('RequestId = ' + response.body.requestId);
      return response.body.playAuth
    } catch (error) {
      console.log('ErrorCode = ' + error.data.Code);
      console.log('ErrorMessage = ' + error.data.Message);
      console.log('RequestId = ' + error.data.RequestId);
      return ''
    }
  },

  async createUploadVideo(data: InputData) {
    const client = await configClient(strapi)

    const request = new CreateUploadVideoRequest()
    request.title = data.title
    request.fileName = data.fileName
    request.description = data.description
    request.userData = '{"Vod":{}}'
    request.templateGroupId = ''
    // request.cateId
    let runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const response = await client.createUploadVideoWithOptions(request, runtime);

      return {
        videoId: response.body.videoId,
        uploadAddress: response.body.uploadAddress,
        uploadAuth: response.body.uploadAuth

      }
    } catch (error) {
      console.log("createUploadVideo Error:" + error)
      // 如有需要，请打印 error
    }

  },

  async refreshUploadVideo(videoId: string) {
    const client = await configClient(strapi)

    const request = new RefreshUploadVideoRequest()
    request.videoId = videoId

    let runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const response = await client.refreshUploadVideoWithOptions(request, runtime);
      return {
        videoId: response.body.videoId,
        uploadAddress: response.body.uploadAddress,
        uploadAuth: response.body.uploadAuth

      }
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  },


  async findAll(query: any) {
    return await strapi.entityService.findMany(model, query)
  },

  // 拿到视频播放凭证
  async token(videoId: string) {
    try {
      const client = await configClient(strapi)

      const req = new GetVideoPlayAuthRequest()
      req.videoId = videoId

      const response: GetVideoPlayAuthResponse = await client.getVideoPlayAuth(req);

      // Play Auth
      console.log('PlayAuth = ' + response.body.playAuth);

      // Base metadata
      if (response.VideoMeta) {
        console.log('VideoMeta.Title = ' + response.body.videoMeta?.Title);
      }
      console.log('RequestId = ' + response.body.requestId);

      return {playAuth: response.body.playAuth, videoMeta: response.body.videoMeta}
    } catch (error) {
      console.log('ErrorCode = ' + error.data.Code);
      console.log('ErrorMessage = ' + error.data.Message);
      console.log('RequestId = ' + error.data.RequestId);
      return ''
    }
  },

  async create(data: CustomVideo) {
    try {
      await strapi.entityService.create(model, {data})
      return true
    } catch (error) {
      return false
    }
  },

  async delete(id: string, videoId: string): Promise<boolean> {
    const client = await configClient(strapi)
    try {

      const req = new DeleteVideoRequest()
      req.videoIds = videoId
      await client.deleteVideo(req)

      await strapi.entityService.delete(model, id)

      return true
    } catch (error) {
      return false
    }
  },

  async update(id: string, videoId: string, data: InputData) {
    const client = await configClient(strapi)

    let req = new UpdateVideoInfoRequest();
    req.videoId = videoId
    req.title = data.title
    req.description = data.description
    let runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.updateVideoInfoWithOptions(req, runtime);

      let customVideo = {
        title: data.title,
        description: data.description,
        // videoId: videoId.videoId,
        // hls: updatedVideo.assets?.hls,
        // iframe: updatedVideo.assets?.iframe,
        // mp4: updatedVideo?.assets?.mp4,
        // player: updatedVideo.assets?.player,
        // thumbnail: updatedVideo?.assets?.thumbnail,
        // tags: updatedVideo.tags,
        metadata: data.metadata,
      } as CustomVideo;

      return await strapi.entityService.update(model, id, {data: customVideo});

    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }

    // const updatedVideo = await client.videos.update(videoId, data)
    //
    //
    // let customVideo = {
    //   title: updatedVideo.title,
    //   description: updatedVideo.description,
    //   videoId: updatedVideo.videoId,
    //   hls: updatedVideo.assets?.hls,
    //   iframe: updatedVideo.assets?.iframe,
    //   mp4: updatedVideo?.assets?.mp4,
    //   player: updatedVideo.assets?.player,
    //   thumbnail: updatedVideo?.assets?.thumbnail,
    //   tags: updatedVideo.tags,
    //   metadata: updatedVideo.metadata,
    // } as CustomVideo;
    //
    // const res = await strapi.entityService.update(model, id, {data: customVideo})
    // return res;
  },

});
