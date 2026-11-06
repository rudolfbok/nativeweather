import type { ReactNode } from 'react';
import { View } from 'react-native';
import { clsx } from 'clsx';
import { Text } from './Text';

interface CardHeaderProps {
	header: string;
	icon?: ReactNode;
	underline?: boolean;
	className?: string;
}

export const CardHeader = ({ header, icon, underline, className }: CardHeaderProps) => (
	<View className={clsx('w-full min-w-0 flex-row items-center gap-2', className)}>
		{icon}
		<Text
			type="title"
			className={clsx('min-w-0 flex-1', underline && 'web:hover:underline')}
			numberOfLines={1}
			ellipsizeMode="tail"
		>
			{header}
		</Text>
	</View>
);
