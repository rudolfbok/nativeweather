import { border } from 'app/constants/border';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { CardHeader } from '../common/layout/CardHeader';
import { StyledPressable } from '../common/styled/StyledPressable';
import { StyledText } from '../common/styled/StyledText';

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
				className={clsx(
					'web:w-full aspect-square h-fit basis-[48%] justify-between rounded-3xl p-4 md:p-4',
					border,
					className
				)}
			>
				<CardHeader icon={icon} header={title} />
				<View className="min-w-0">
					{description && (
						<StyledText type="body" className="line-clamp-1" numberOfLines={1} ellipsizeMode="tail">
							{description}
						</StyledText>
					)}
					{extraContent && <View className="min-w-0">{extraContent}</View>}
				</View>
				<View className={clsx('w-full min-w-0 items-end')}>
					<StyledText type="data" className={clsx('w-full text-right')} numberOfLines={1} ellipsizeMode="tail">
						{data}
					</StyledText>
				</View>
			</StyledPressable>
			{modal}
		</>
	);
};
