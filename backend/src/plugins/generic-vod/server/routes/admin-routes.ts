export default [
    {
        method: 'GET',
        path: '/vod-video',
        handler: 'admin.findAll',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/vod-video/token/:videoId',
        handler: 'admin.token',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-video',
        handler: 'admin.create',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/vod-video/:id/:videoId',
        handler: 'admin.update',
        config: {
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/vod-video/:id/:videoId',
        handler: 'admin.delete',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-video/create',
        handler: 'admin.createVideoId',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/vod-video/refresh',
        handler: 'admin.refreshVideoId',
        config: {
            policies: [],
        },
    },
]
