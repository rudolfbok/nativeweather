import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react-native';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledPressable } from '../styled/StyledPressable';
import { StyledText } from '../styled/StyledText';
import { CardHeader } from '../layout/CardHeader';
import { useState } from 'react';
import { border } from 'app/constants/border';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';

interface ModalHeaderProps {
	icon?: React.ReactNode;
	header: string;
	subHeader?: React.ReactNode;
	daysToggle?: React.ReactNode;
	showBack?: boolean;
	onBackPress?: (e: GestureResponderEvent) => void;
	onClose: (e: GestureResponderEvent) => void;
}

export const ModalHeader = ({
	icon,
	header,
	subHeader,
	daysToggle = null,
	showBack,
	onBackPress,
	onClose,
}: ModalHeaderProps) => {
	const [hover, setHover] = useState(false);
	const { text } = useThemeColors();

	return (
		<View className="macos:px-4">
			<View className={clsx('flex-row items-center justify-between pb-4', daysToggle && '!items-start')}>
				<View className={clsx('flex-1', subHeader && 'flex-col')}>
					{showBack ? (
						<View className={clsx('flex-row items-center gap-2')}>
							<StyledPressable onPress={onBackPress} className={clsx('rounded-full p-1.5', border)}>
								<ChevronLeft color={text} size={26} />
							</StyledPressable>
							<Pressable onPress={onBackPress}>
								<StyledText type="title" className="hover:underline">
									{header}
								</StyledText>
							</Pressable>
						</View>
					) : (
						<CardHeader icon={icon} header={header} underline={false} />
					)}
					{subHeader && <StyledText type="body">{subHeader}</StyledText>}
				</View>
				<StyledPressable onPress={onClose} className={clsx('rounded-full p-1.5', border)}>
					<CloseIcon size={26} />
				</StyledPressable>
			</View>
			{daysToggle}
		</View>
	);
};
