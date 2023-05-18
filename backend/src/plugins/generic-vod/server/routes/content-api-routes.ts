export default [
    {
        method: 'GET',
        path: '/vod-video',
        handler: 'content-api.find',
        config: {
            description: 'Find all vod assets',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/count',
        handler: 'content-api.count',
        config: {
            description: 'Counts the number of vod items',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/:id',
        handler: 'content-api.findOne',
        config: {
            description: 'Find one vod asset by id',
            policies: [],
        },
    },
]
