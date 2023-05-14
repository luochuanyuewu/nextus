export default {
    kind: 'collectionType',
    collectionName: 'vod-videos',
    info: {
        name: 'vod-video',
        singularName: 'vod-video',
        pluralName: 'vod-videos',
        displayName: 'Vod-Video',
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
        videoId: {
            type: 'string',
            required: true,
            maxLength: 255,
            configurable: false,
        },
        hls: {
            type: 'string',
            required: false,
        },
        iframe: {
            type: 'string',
            required: false,
        },
        mp4: {
            type: 'string',
            required: false,
        },
        player: {
            type: 'string',
            required: false,
        },
        thumbnail: {
            type: 'string',
            required: false,
        },
        tags: {
            type: 'json',
        },
        metadata: {
            type: 'json',
        },
    },
};
