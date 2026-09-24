import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CheckIcon } from 'app/components/icons/ui/CheckIcon';
import { ChevronIcon } from 'app/components/icons/ui/ChevronIcon';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { GestureResponderEvent, Platform, StyleSheet, View } from 'react-native';

interface SettingsItemProps {
	icon: ReactNode;
	title: string;
	showModal?: (event: GestureResponderEvent) => void | Promise<void>;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	currentValue?: string;
	iconbg: string;
	border?: boolean;
	toggle?: ReactNode;
	selected?: boolean;
	variant: 'link' | 'value' | 'toggle' | 'check';
}

export const SettingsItem = ({
	icon,
	title,
	showModal,
	onPress,
	currentValue,
	iconbg,
	border,
	toggle,
	selected,
	variant,
}: SettingsItemProps) => {
	const rightElement = {
		value: (
			<View className={clsx('flex flex-row items-center gap-1')}>
				<StyledText type="body" className={clsx('opacity-70')}>
					{currentValue}
				</StyledText>
				<ChevronIcon />
			</View>
		),
		link: <ChevronIcon />,
		toggle: toggle,
		check: selected ? <CheckIcon /> : null,
	};

	return (
		<StyledPressable
			onPress={Platform.OS === 'web' ? (variant === 'check' || variant === 'link' ? onPress : showModal) : onPress}
			className={clsx(
				'select-none px-4 pt-4',
				variant !== 'toggle' && 'active:!bg-tertiarySystemBackground active:dark:!bg-tertiarySystemBackground_dark',
				variant === 'toggle' && 'hover:!bg-transparent active:!bg-transparent'
				// 'macos:bg-secondarySystemBackground macos:dark:bg-tertiarySystemBackground_dark/70'
			)}
		>
			<View
				className={clsx(
					'w-full flex-row items-center justify-between pb-4',
					border && 'border-b border-gray-200 dark:border-zinc-800'
				)}
				style={border && { borderBottomWidth: StyleSheet.hairlineWidth }}
			>
				<View className={clsx('flex flex-row items-center gap-3')}>
					<View className={clsx('rounded-xl p-2', iconbg)}>{icon}</View>
					<StyledText type="body" className={clsx('font-semibold')}>
						{title}
					</StyledText>
				</View>
				{rightElement[variant]}
			</View>
		</StyledPressable>
	);
};
