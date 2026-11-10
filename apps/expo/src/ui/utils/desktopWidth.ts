import { isTauri } from '@tauri-apps/api/core';

// The Tauri window keeps its content in a centred column, leaving blank space at the sides when it is maximised.
export const desktopWidth = isTauri() ? 'w-full max-w-4xl self-center' : undefined;
