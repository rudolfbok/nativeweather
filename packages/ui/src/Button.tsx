import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'className'> {
	children: ReactNode;
	loading?: boolean;
	className?: string;
}

export function Button({ children, loading = false, disabled, style, className, ...props }: ButtonProps) {
	const isDisabled = disabled || loading;
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			style={style}
			className={twMerge(
				'min-h-11 flex-row items-center justify-center rounded-ui bg-ui-primary px-4.5',
				isDisabled && 'opacity-55',
				className
			)}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text className="text-base font-semibold text-label">{children}</Text>
			)}
		</Pressable>
	);
}
