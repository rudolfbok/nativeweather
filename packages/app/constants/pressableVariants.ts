import { clsx } from 'clsx';
import { Platform } from 'react-native';

const bg = 'bg-systemBackground dark:bg-secondarySystemBackground_dark';
const hover = 'hover:bg-tertiarySystemBackground dark:hover:bg-tertiarySystemBackground_dark';
const active = 'active:bg-tertiarySystemBackground dark:active:bg-tertiarySystemBackground_dark';

export const variants = Platform.select({
	web: clsx(bg, hover),
	macos: clsx(bg, hover),
	default: clsx(bg, active),
});
