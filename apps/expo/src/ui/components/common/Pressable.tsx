import type { PressableProps as NativePressableProps } from 'react-native';
import { Pressable as NativePressable } from 'react-native';
import { clsx } from 'clsx';

export type PressableProps = NativePressableProps;

export const Pressable = ({ className, ...props }: PressableProps) => (
	<NativePressable
		className={clsx(
			'bg-card-background active:bg-tertiary-system-background web:cursor-pointer web:hover:bg-tertiary-system-background',
			className
		)}
		{...props}
	/>
);
