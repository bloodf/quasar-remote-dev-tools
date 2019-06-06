import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default ({ app, router, store, Vue }) => {
  if (Platform.is.cordova || Platform.is.electron || Platform.is.safari || Platform.is.edge || Platform.is.mobile) {
    Vue.config.devtools = true;
    window.QuasarDev = {
      app,
      router,
      store,
      Vue,
    };
    devtools.connect(process.env.DEVTOOLS_IP, parseInt(process.env.DEVTOOLS_PORT || "8098", 10));
  }
};
