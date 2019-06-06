import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default ({ app, router, store, Vue }) => {
  const is = Platform.is;
  if (
    process.env.DEVTOOLS
    && (
      is.cordova 
      || is.electron 
      || is.safari 
      || is.edge 
      || is.mobile)
    ) {
    const ip = process.env.DEVTOOLS_IP;
    const port = 8098;

    window.QuasarDev = {
      app,
      router,
      store,
      Vue,
    };

    window.__VUE_DEVTOOLS_HOST__ = ip;
    window.__VUE_DEVTOOLS_PORT__ = port;

    devtools.connect(ip, port);
  }
};
