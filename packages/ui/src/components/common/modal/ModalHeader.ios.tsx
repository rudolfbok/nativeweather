import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { border } from '@nativeweather/core/constants/border';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react-native';
import { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledPressable } from '../styled/StyledPressable';
import { StyledText } from '../styled/StyledText';

interface ModalHeaderProps {
	icon?: ReactNode;
	header?: string;
	title?: string;
	subHeader?: ReactNode;
	daysToggle?: ReactNode;
	showBack?: boolean;
	onBackPress?: (event: GestureResponderEvent) => void;
	onClose?: (event: GestureResponderEvent) => void;
}

export const ModalHeader = ({
	icon,
	header,
	title,
	subHeader,
	daysToggle,
	showBack,
	onBackPress,
	onClose,
}: ModalHeaderProps) => {
	const { text } = useThemeColors();
	const heading = header ?? title ?? '';

	return (
		<View>
			<View className={clsx('flex-row items-center justify-between pb-4', daysToggle && '!items-start')}>
				<View className={clsx('flex-1', subHeader && 'flex-col')}>
					{showBack ? (
						<View className={clsx('flex-row items-center gap-2')}>
							<StyledPressable onPress={onBackPress} className={clsx('rounded-full p-1.5', border)}>
								<ChevronLeft color={text} size={24} />
							</StyledPressable>
							<Pressable onPress={onBackPress}>
								<StyledText type="title" className="font-bold">
									{heading}
								</StyledText>
							</Pressable>
						</View>
					) : (
						<View className={clsx('flex-row items-center gap-2')}>
							{icon}
							<StyledText type="title" className="font-bold">
								{heading}
							</StyledText>
						</View>
					)}
					{subHeader && <StyledText type="body">{subHeader}</StyledText>}
				</View>
				{onClose && (
					<StyledPressable onPress={onClose} className={clsx('rounded-full p-1.5', border)}>
						<CloseIcon />
					</StyledPressable>
				)}
			</View>
			{daysToggle}
		</View>
	);
};
