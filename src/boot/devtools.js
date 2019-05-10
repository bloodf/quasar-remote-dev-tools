import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default () => {
  if (Platform.is.cordova) {
    devtools.connect(process.env.DEVTOOLSIP, 8098);
  }
};
