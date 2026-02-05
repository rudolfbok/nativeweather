import { clsx } from 'clsx';
import { View, StyleSheet } from 'react-native';

export const Separator = () => {
	return (
		<View
			className={clsx('border-b border-gray-200 dark:border-zinc-800')}
			style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
		/>
	);
};
