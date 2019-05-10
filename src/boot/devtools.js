import devtools from '@vue/devtools';
import { Platform } from 'quasar';

export default () => {
  if (Platform.is.cordova || Platform.is.electron) {
    devtools.connect(process.env.DEVTOOLSIP, 8098);
  }
};
