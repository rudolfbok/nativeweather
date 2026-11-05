import type { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Pressable } from './Pressable';
import type { PressableProps } from './Pressable';
import { Text } from './Text';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
	children: ReactNode;
	loading?: boolean;
}

export const Button = ({ children, loading = false, disabled, className, ...props }: ButtonProps) => {
	const isDisabled = disabled || loading;

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			className={twMerge(
				'w-full flex-row items-center justify-center gap-2 rounded-3xl bg-primary-blue p-4 select-none active:bg-primary-blue active:opacity-80 lg:px-6 web:hover:bg-primary-blue web:hover:opacity-90',
				isDisabled && 'opacity-55',
				className
			)}
			{...props}
		>
			{loading ? (
				<ActivityIndicator colorClassName="accent-ui-foreground" />
			) : (
				<Text type="body" className="text-center font-semibold text-ui-foreground">
					{children}
				</Text>
			)}
		</Pressable>
	);
};
