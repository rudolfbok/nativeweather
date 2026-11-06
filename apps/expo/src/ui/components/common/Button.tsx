import type { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';
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
			className={clsx(
				'w-full flex-row items-center justify-center gap-2 rounded-3xl bg-primary-blue p-4 select-none active:bg-primary-blue active:opacity-80 lg:px-6 web:hover:bg-primary-blue web:hover:opacity-90',
				isDisabled && 'opacity-55',
				className
			)}
			{...props}
		>
			{/* The label stays rendered while loading so the button keeps its size. */}
			<Text type="body" className={clsx('text-center font-semibold text-ui-foreground', loading && 'opacity-0')}>
				{children}
			</Text>
			{loading && <ActivityIndicator colorClassName="accent-ui-foreground" className="absolute" />}
		</Pressable>
	);
};
