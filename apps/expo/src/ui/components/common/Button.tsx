import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import type { PressableProps } from 'react-native';
import { clsx } from 'clsx';
import { Text } from './Text';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
	children: ReactNode;
	loading?: boolean;
}

export const Button = ({ children, loading = false, disabled, className, ...props }: ButtonProps) => {
	const isDisabled = disabled || loading;

	return (
		// The plain Pressable: ours brings a grey hover background, and the button only fades on hover and press.
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			className={clsx(
				'w-full flex-row items-center justify-center gap-2 rounded-3xl bg-primary-blue p-4 select-none lg:px-6',
				isDisabled ? 'opacity-55' : 'active:opacity-80 web:cursor-pointer web:hover:opacity-90',
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
