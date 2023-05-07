export default {
  'vod-asset': {
    schema: {
      kind: 'collectionType',
      collectionName: 'vod-assets',
      info: {
        name: 'vod-asset',
        singularName: 'vod-asset',
        pluralName: 'vod-assets',
        displayName: 'Video Asset',
      },
      pluginOptions: {
        'content-manager': {
          visible: true,
        },
        'content-type-builder': {
          visible: true,
        },
      },
      options: {
        draftAndPublish: false,
        comment: '',
      },
      attributes: {
        title: {
          type: 'string',
          required: true,
        },
        description: {
          type: 'string',
          required: false,
        },
        _public: {
          type: 'boolean',
          default: true,
          required: true
        },
        videoId: {
          type: 'string',
          required: true,
          maxLength: 255,
          configurable: false,
        },
        hls: {
          type: 'string',
          required: true,
        },
        iframe: {
          type: 'string',
          required: true,
        },
        mp4: {
          type: 'string',
          required: true,
        },
        player: {
          type: 'string',
          required: true,
        },
        thumbnail: {
          type: 'string',
          required: true,
        },
        tags: {
          type: 'json',
        },
        metadata: {
          type: 'json',
        },
      },
    },
  },
};
