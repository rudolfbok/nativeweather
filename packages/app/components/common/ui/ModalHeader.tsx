import { clsx } from 'clsx';
import { ChevronLeft, X } from 'lucide-react-native';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledPressable } from '../styled/StyledPressable';
import { StyledText } from '../styled/StyledText';
import { CardHeader } from './CardHeader';

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
	return (
		<View>
			<View className={clsx('flex-row items-center justify-between pb-4', daysToggle && '!items-start')}>
				<View className={clsx('flex-1', subHeader && 'flex-col')}>
					{showBack ? (
						<Pressable onPress={onBackPress} className={clsx('-ml-1 flex-row items-center gap-2')}>
							<ChevronLeft color="#007AFF" size={29} style={{ pointerEvents: 'none' }} />
							<CardHeader icon={icon} header={header} underline={true} />
						</Pressable>
					) : (
						<CardHeader icon={icon} header={header} underline={false} />
					)}
					{subHeader && <StyledText type="body">{subHeader}</StyledText>}
				</View>
				<StyledPressable onPress={onClose} className={clsx('rounded-full p-1')}>
					<X color="#007AFF" size={28} style={{ pointerEvents: 'none' }} />
				</StyledPressable>
			</View>
			{daysToggle}
		</View>
	);
};
