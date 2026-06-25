const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'player',
  exposes: {
    './Routes': './src/app/remote-entry/routes.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

module.exports = {
  ...mfConfig,
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.angular/**'
    ]
  }
};
