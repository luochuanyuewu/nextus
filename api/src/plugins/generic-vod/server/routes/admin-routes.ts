export default [
    {
        method: 'GET',
        path: '/vod-asset',
        handler: 'admin.findAll',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-asset/token/:videoId',
        handler: 'admin.token',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-asset',
        handler: 'admin.create',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/vod-asset/:id/:videoId',
        handler: 'admin.update',
        config: {
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/vod-asset/:id/:videoId',
        handler: 'admin.delete',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-asset/create',
        handler: 'admin.createVideoId',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-asset/refresh',
        handler: 'admin.refreshVideoId',
        config: {
            policies: [],
        },
    },
]
