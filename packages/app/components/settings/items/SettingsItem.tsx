import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ChevronIcon } from 'app/components/icons/ChevronIcon';
import { clsx } from 'clsx';
import { Check } from 'lucide-react-native';
import { ReactNode } from 'react';
import { GestureResponderEvent, Platform, View, StyleSheet, Pressable } from 'react-native';

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
	const RightElement = () => {
			switch (variant) {
			case 'value':
				return (
					<View className={clsx('flex flex-row items-center gap-1')}>
						<StyledText type="body" className={clsx('opacity-70')}>
							{currentValue}
						</StyledText>
						<ChevronIcon />
					</View>
				);
			case 'link':
				return <ChevronIcon />;
			case 'toggle':
				return toggle;
			case 'check':
				return selected ? <Check color="#007AFF" /> : null;
			default:
				return null;
		}
	};

	return (
		<StyledPressable
			onPress={Platform.OS === 'web' ? (variant === 'check' || variant === 'link' ? onPress : showModal) : onPress}
			liquidGlass={false}
			className={clsx(
				'select-none px-4 pt-4',
				variant !== 'toggle' && 'active:!bg-tertiarySystemBackground active:dark:!bg-tertiarySystemBackground_dark',
				variant === 'toggle' && 'hover:!bg-transparent active:!bg-transparent'
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
				<RightElement />
			</View>
		</StyledPressable>
	);
};
