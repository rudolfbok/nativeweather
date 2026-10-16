import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { StyledText } from '../common/styled/StyledText';
import { CardHeader } from '../common/layout/CardHeader';
import { StyledPressable } from '../common/styled/StyledPressable';

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
	const wide = className?.includes('min-w-full');

	return (
		<>
			<StyledPressable
				onPress={onPress}
				className={clsx(
					'justify-between overflow-hidden rounded-3xl p-4 macos:h-[180px]',
					wide ? 'macos:w-[49%]' : 'macos:w-[23.5%] aspect-square',
				)}
			>
				<CardHeader icon={icon} header={title} />
				<View>
					{description && <StyledText type="body">{description}</StyledText>}
					{extraContent && <View>{extraContent}</View>}
				</View>
				<View className="w-full items-end">
					<StyledText type="data" className="text-right">
						{data}
					</StyledText>
				</View>
			</StyledPressable>
			{modal}
		</>
	);
};
