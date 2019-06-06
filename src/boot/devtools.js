import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default ({ app, router, store, Vue }) => {
  if (Platform.is.cordova || Platform.is.electron || Platform.is.safari || Platform.is.edge || Platform.is.mobile) {
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
    setTimeout(() => {
      devtools.connect(ip, port);    
    }, 5000);
  }
};
