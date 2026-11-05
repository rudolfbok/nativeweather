import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const Separator = ({ className }: { className?: string }) => (
	<View className={twMerge('border-b border-separator', className)} />
);
