import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';

export function renderError(errText) {
  return error({
    text: errText,
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}