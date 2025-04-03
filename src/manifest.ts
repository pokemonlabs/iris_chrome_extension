const manifest = {
  manifest_version: 3,
  name: 'Iris Chrome Extension',
  description: 'AI-powered Chrome extension for browsing assistance',
  version: '1.0',
  action: {
    default_icon: {
      '16': 'icons/icon16.png',
      '48': 'icons/icon48.png',
      '128': 'icons/icon128.png'
    },
    default_title: "Open Iris Sidepanel"
  },
  background: {
    service_worker: 'background.js'
  },
  permissions: [
    'activeTab',
    'storage',
    'sidePanel',
    'scripting',
    'tabs'
  ],
  host_permissions: [
    '<all_urls>'
  ],
  side_panel: {
    default_path: 'sidepanel.html'
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['content-script.js']
    }
  ],
  icons: {
    '16': 'icons/icon16.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png'
  }
};

export default manifest;