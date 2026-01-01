import clsx from 'clsx';
import { ChevronLeft, X } from 'lucide-react-native';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { CardHeader } from './CardHeader';
import { StyledPressable } from './StyledPressable';
import { StyledText } from './StyledText';
import { useSwitchColors } from 'app/hooks/useSwitchColors';

interface ModalHeaderProps {
	icon?: React.ReactNode;
	header: string;
	subHeader?: React.ReactNode;
	daysToggle: React.ReactNode;
	showBack?: boolean;
	onBackPress?: (e: GestureResponderEvent) => void;
	onClose: (e: GestureResponderEvent) => void;
}

export const ModalHeader = ({
	icon,
	header,
	subHeader,
	daysToggle,
	showBack,
	onBackPress,
	onClose,
}: ModalHeaderProps) => {
	const switchColors = useSwitchColors('black', 'white');
	return (
		<>
			<View className={clsx('web:hidden my-2 w-full items-center')}>
				<View className={clsx('h-1 w-12 rounded-full bg-zinc-600/40')} />
			</View>
			<View className={clsx('web:pt-4 flex-row items-center justify-between px-4 pb-2', daysToggle && '!items-start')}>
				<View className={clsx('flex-1', subHeader && 'flex-col')}>
					{showBack ? (
						<Pressable onPress={onBackPress} className={clsx('-ml-1 flex-row items-center gap-2')}>
							<ChevronLeft color="#007AFF" size={29} />
							<CardHeader icon={icon} header={header} underline={true} />
						</Pressable>
					) : (
						<CardHeader icon={icon} header={header} underline={false} />
					)}
					{subHeader && <StyledText type="body">{subHeader}</StyledText>}
				</View>
				<StyledPressable onPress={onClose} className={clsx('rounded-full p-1')}>
					<X color={switchColors} size={28} />
				</StyledPressable>
			</View>
			{daysToggle}
		</>
	);
};
