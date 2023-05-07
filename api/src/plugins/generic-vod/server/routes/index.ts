// import apiVideoContentApiRoutes from './content-api-routes'

import vodAdminRoutes from './admin-routes'
import vodSettingsRoutes from './settings-routes'

const routes = {
  // routes for the admin panel (/api-video-uploader/vod-asset/...)
  admin: {
    type: 'admin',
    routes: vodAdminRoutes,
  },
  // routes for the plugin settings panel (/generic-vod/settings)
  settings: {
    routes: vodSettingsRoutes,
  },
  // routes for the content api (/api/api-video-uploader/...)
  // 'content-api': {
  //   type: 'content-api',
  //   routes: apiVideoContentApiRoutes,
  // },
}

export default routes
