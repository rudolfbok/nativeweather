import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { StyledPressable } from '../common/styled/StyledPressable';
import { StyledText } from '../common/styled/StyledText';
import { CardHeader } from '../common/ui/CardHeader';

interface DataCardProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: React.ReactNode;
	title: string;
	description?: string;
	data: string | number | null;
	extraContent?: React.ReactNode;
	className?: string;
	modal: React.ReactNode;
	style?: React.CSSProperties;
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
	style,
}: DataCardProps) => {
	return (
		<>
			<StyledPressable
				onPress={onPress}
				className={clsx('web:w-full aspect-square h-fit basis-[48%] justify-between rounded-3xl p-4 md:p-4', className)}
				style={{
					aspectRatio: 1,
					flexBasis: '48%',
					width: '48%',
					height: 173,
					justifyContent: 'space-between',
					padding: 16,
					...style,
				}}
				// glassEffectStyle="clear"
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
