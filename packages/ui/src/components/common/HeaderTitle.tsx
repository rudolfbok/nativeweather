import type { ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface HeaderTitleProps {
	children: string;
	icon?: ReactNode;
	className?: string;
}

// For the native navigation bar, whose own title can't show an icon or be resized.
export const HeaderTitle = ({ children, icon, className }: HeaderTitleProps) => (
	<View className="flex-row items-center gap-2">
		{icon}
		<Text type="title" numberOfLines={1} className={twMerge('text-[17px]', className)}>
			{children}
		</Text>
	</View>
);
