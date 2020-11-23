module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: ['@snowpack/plugin-typescript'],
  install: [
    '@fullcalendar/core',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/list',
    '@fullcalendar/timegrid',
    '@material/mwc-button',
    '@material/mwc-checkbox',
    '@material/mwc-dialog',
    '@material/mwc-drawer',
    '@material/mwc-fab',
    '@material/mwc-icon-button',
    '@material/mwc-icon-button-toggle',
    '@material/mwc-linear-progress',
    '@material/mwc-list',
    '@material/mwc-menu',
    '@material/mwc-select',
    '@material/mwc-snackbar',
    '@material/mwc-tab',
    '@material/mwc-tab-bar',
    '@material/mwc-textarea',
    '@material/mwc-textfield',
    '@material/mwc-top-app-bar',
    '@mdi/js',
    '@urql/svelte',
    'cypress',
    'graphql',
    'moment',
    'nodemailer',
    'svelte-i18n',
    'sveltejs-tippy',
  ],
  installOptions: {
    installTypes: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
