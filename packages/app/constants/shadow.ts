import { Platform } from 'react-native';

export const shadow = Platform.OS === 'macos' ? '' : 'shadow-md dark:shadow-white/10';
