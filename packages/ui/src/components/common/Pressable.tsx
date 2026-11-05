import type { PressableProps as NativePressableProps } from 'react-native';
import { Pressable as NativePressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type PressableProps = NativePressableProps;

export const Pressable = ({ className, ...props }: PressableProps) => (
	<NativePressable
		className={twMerge(
			'bg-card-background active:bg-tertiary-system-background web:cursor-pointer web:hover:bg-tertiary-system-background',
			className
		)}
		{...props}
	/>
);
