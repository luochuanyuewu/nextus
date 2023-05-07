import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import pluginPermissions from './permissions';
import getTrad from "./utils/getTrad";
const name = pluginPkg.strapi.displayName;
const displayName = pluginPkg.strapi.displayName

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('plugin.name'),
        defaultMessage: displayName,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      Permissions: pluginPermissions.mainRead
      // permissions: [
      //   // Uncomment to set the permissions of the plugin here
      //   // {
      //   //   action: '', // the action name should be plugin::plugin-name.actionType
      //   //   subject: null,
      //   // },
      // ],
    });

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: getTrad('plugin.name'),
          defaultMessage: displayName,
        },
      },
      [
        {
          intlLabel: {
            id: 'Settings Section api.video uploader',
            defaultMessage: 'Settings',
          },
          id: 'api-video-uploader-settings',
          to: `/settings/${pluginId}`,
          permissions: pluginPermissions.settingsRoles,
          Component: async () => await import('./pages/Settings'),
        },
      ]
    )

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
