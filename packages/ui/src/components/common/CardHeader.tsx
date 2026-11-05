import type { ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface CardHeaderProps {
	header: string;
	icon?: ReactNode;
	underline?: boolean;
	className?: string;
}

export const CardHeader = ({ header, icon, underline, className }: CardHeaderProps) => (
	<View className={twMerge('w-full min-w-0 flex-row items-center gap-2', className)}>
		{icon}
		<Text
			type="title"
			className={twMerge('min-w-0 flex-1', underline && 'web:hover:underline')}
			numberOfLines={1}
			ellipsizeMode="tail"
		>
			{header}
		</Text>
	</View>
);
