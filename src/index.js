const ip = require('ip');

const { spawn } = require('child_process');

module.exports = (api, ctx) => {
  let runDevTools = false;
  api.compatibleWith('@quasar/app', '^1.0.0-beta.18');
  api.extendQuasarConf((conf, api) => {
    conf.build.env = {
      DEVTOOLS_IP: JSON.stringify(ip.address()),
      DEVTOOLS: true,
      ...conf.build.env,
    };

    if(conf.build.env.DEVTOOLS){
      conf.boot.push('~quasar-app-extension-remote-dev-tools/src/boot/devtools.js');
      console.log(` App Extension (remote-devtools) Info: 'Adding devtools boot reference to your quasar.conf.js'`);
      conf.build.transpileDependencies.push(/quasar-app-extension-remote-dev-tools[\\/]src/);
      runDevTools = true;
    }
  });

  api.beforeDev(() => {
    if (runDevTools) {
      console.log(`Opening vue-devtools for your IP: ${ip.address()}`);
      spawn('npx', ['vue-devtools']);
    }
  });
};
