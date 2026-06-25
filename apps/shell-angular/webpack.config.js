const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  // name: 'shell-angular',

  // exposes: {
  //   './Component': './src\app\app.ts',
  // },
  
  // remotes: {
  //   player: 'http://localhost:4201/remoteEntry.js',
  //   admin: 'http://localhost:4202/remoteEntry.js',
  // },
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
