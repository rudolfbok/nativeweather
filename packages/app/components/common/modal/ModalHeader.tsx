import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react-native';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledPressable } from '../styled/StyledPressable';
import { StyledText } from '../styled/StyledText';
import { CardHeader } from '../layout/CardHeader';
import { useState } from 'react';

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

	return (
		<View className="macos:px-4">
			<View className={clsx('flex-row items-center justify-between pb-4', daysToggle && '!items-start')}>
				<View className={clsx('flex-1', subHeader && 'flex-col')}>
					{showBack ? (
						<Pressable
							onPress={onBackPress}
							className={clsx('-ml-1 flex-row items-center gap-2')}
							style={{ cursor: 'pointer' }}
							onHoverIn={() => setHover(true)}
							onHoverOut={() => setHover(false)}
						>
							<ChevronLeft color="#007AFF" size={29} />
							<CardHeader icon={icon} header={header} underline={true} className={clsx(hover && 'underline')} />
						</Pressable>
					) : (
						<CardHeader icon={icon} header={header} underline={false} />
					)}
					{subHeader && <StyledText type="body">{subHeader}</StyledText>}
				</View>
				<StyledPressable onPress={onClose} className={clsx('rounded-full p-1.5')}>
					<CloseIcon size={26} />
				</StyledPressable>
			</View>
			{daysToggle}
		</View>
	);
};
