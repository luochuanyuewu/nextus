export default [
    {
        method: 'GET',
        path: '/vod-asset',
        handler: 'content-api.find',
        config: {
            description: 'Find all vod assets',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-asset/count',
        handler: 'content-api.count',
        config: {
            description: 'Counts the number of vod items',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-asset/:id',
        handler: 'content-api.findOne',
        config: {
            description: 'Find one vod asset by id',
            policies: [],
        },
    },
]
