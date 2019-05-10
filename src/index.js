/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const ip = require('ip');

const { spawn } = require('child_process'),

const extendConf = function(conf) {
  conf.boot.push('~quasar-app-extension-remote-dev-tools/src/boot/devtools.js');
  console.log(` App Extension (devtools) Info: 'Adding devtools boot reference to your quasar.conf.js'`);
  conf.build.transpileDependencies.push(/quasar-app-extension-remote-dev-tools[\\/]src/);
  conf.build.env = {
    ...conf.build.env,
    DEVTOOLSIP: JSON.stringify(ip.address()),
  };
};

module.exports = function(api) {
  api.compatibleWith('@quasar/app', '^1.0.0-beta.18');

  if (api.ctx.dev === true && ['electron', 'cordova'].includes(api.ctx.mode)) {
    api.extendQuasarConf(extendConf);
  }

  api.beforeDev(() => {
    console.log('Opening vue-devtools.');
    spawn('npx', ['vue-devtools']);
  })
};
