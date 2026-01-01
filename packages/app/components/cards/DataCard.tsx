import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { StyledPressable } from '../common/StyledPressable';
import { StyledText } from '../common/StyledText';
import { CardHeader } from '../common/CardHeader';

interface DataCardProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: React.ReactNode;
	title: string;
	description?: string;
	data: string | number | null;
	extraContent?: React.ReactNode;
	className?: string;
	modal: React.ReactNode;
}

export const DataCard = ({
	onPress,
	icon,
	title,
	description,
	data,
	extraContent,
	className,
	modal,
}: DataCardProps) => {
	return (
		<>
			<StyledPressable
				onPress={onPress}
				className={clsx('web:w-full aspect-square h-fit basis-[48%] justify-between rounded-3xl p-4 md:p-4', className)}
			>
				<CardHeader icon={icon} header={title} />
				<View>
					{description && <StyledText type="body">{description}</StyledText>}
					{extraContent && <View>{extraContent}</View>}
				</View>
				<View className={clsx('w-full items-end')}>
					<StyledText type="data" className={clsx('text-end')}>
						{data}
					</StyledText>
				</View>
			</StyledPressable>
			{modal}
		</>
	);
};
