import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default ({ app, router, store, Vue }) => {
  if (Platform.is.cordova || Platform.is.electron || Platform.is.safari || Platform.is.edge || Platform.is.mobile) {
    window.QuasarDev = {
      app,
      router,
      store,
      Vue,
    };
    devtools.connect(process.env.DEVTOOLSIP, 8098);
  }
};
