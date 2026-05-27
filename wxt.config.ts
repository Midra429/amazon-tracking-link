import type { UserManifest } from 'wxt'

import { defineConfig } from 'wxt'

import { GITHUB_URL } from './src/constants'

import { description, displayName, name } from './package.json'

export default defineConfig({
  manifestVersion: 3,
  manifest: ({ browser }) => {
    let browser_specific_settings: UserManifest['browser_specific_settings']

    switch (browser) {
      case 'firefox':
        browser_specific_settings = {
          gecko: {
            id: `${name}@midra.me`,
            strict_min_version: '142.0',
            data_collection_permissions: {
              required: ['none'],
            },
          },
        }

        break
    }

    return {
      name: displayName,
      description,
      default_locale: 'ja',
      homepage_url: GITHUB_URL,
      browser_specific_settings,
    }
  },

  srcDir: 'src',
  outDir: 'dist',
  autoIcons: {
    baseIconPath: '../assets/icon.png',
    sizes: [512],
  },
  imports: false,
  modules: ['@wxt-dev/auto-icons'],
})
