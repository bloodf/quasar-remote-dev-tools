const ip = require('ip');

const { spawn } = require('child_process');

function extendConf(conf) {
  conf.boot.push('~quasar-app-extension-remote-dev-tools/src/boot/devtools.js');
  console.log(` App Extension (devtools) Info: 'Adding devtools boot reference to your quasar.conf.js'`);
  conf.build.transpileDependencies.push(/quasar-app-extension-remote-dev-tools[\\/]src/);
  conf.build.env = {
    ...conf.build.env,
    DEVTOOLS_IP: JSON.stringify(ip.address()),
    DEVTOOLS: true,
  };
}

module.exports = function(api) {
  api.compatibleWith('@quasar/app', '^1.0.0-beta.18');

  if (api.ctx.dev === true && (api.ctx.mode.electron || api.ctx.mode.cordova)) {
    api.extendQuasarConf(extendConf);
    api.beforeDev(() => {
      console.log(`Opening vue-devtools for your IP: ${ip.address()}`);
      spawn('npx', ['vue-devtools']);
    });
  }
};
