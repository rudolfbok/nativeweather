import { isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import { Linking } from 'react-native';

/** A Tauri webview cannot open links itself; the opener plugin hands them to the system browser. */
export const openExternal = (url: string) => void (isTauri() ? openUrl(url) : Linking.openURL(url));
