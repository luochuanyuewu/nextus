export default [
    {
        method: 'GET',
        path: '/vod-video',
        handler: 'vod-video.find',
        config: {
            description: 'Find all vod assets',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/token/:videoId',
        handler: 'vod-video.token',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/count',
        handler: 'vod-video.count',
        config: {
            description: 'Counts the number of vod items',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/:id',
        handler: 'vod-video.findOne',
        config: {
            description: 'Find one vod asset by id',
            policies: [],
        },
    },
]
