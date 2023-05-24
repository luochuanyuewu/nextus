
import vodAdminRoutes from './admin-routes'
import vodSettingsRoutes from './settings-routes'
import voidContentApiRoutes from './content-api-routes'


const routes = {
  // routes for the admin panel (/api-video-uploader/vod-video/...)
  admin: {
    type: 'admin',
    routes: vodAdminRoutes,
  },
  // routes for the plugin settings panel (/generic-vod/settings)
  settings: {
    routes: vodSettingsRoutes,
  },
  // routes for the content api (/api/api-video-uploader/...)
  'content-api': {
    type: 'content-api',
    routes: voidContentApiRoutes,
  },
}

export default routes