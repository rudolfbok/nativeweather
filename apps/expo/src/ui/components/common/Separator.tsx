import { View } from 'react-native';
import { clsx } from 'clsx';

export const Separator = ({ className }: { className?: string }) => (
	<View className={clsx('border-b border-separator', className)} />
);
