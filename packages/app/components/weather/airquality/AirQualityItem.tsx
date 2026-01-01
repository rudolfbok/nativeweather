import { StyledPressable } from 'app/components/common/StyledPressable';
import { StyledText } from 'app/components/common/StyledText';
import { AirQualityIndicator } from 'app/components/icons/AirQualityIndicator';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';

interface AirQualityItemProps {
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
	item: string;
	data: number | undefined;
	units?: string;
	description: string;
	colorIndicator?: string;
}

export const AirQualityItem = ({ onPress, item, data, units, description, colorIndicator }: AirQualityItemProps) => {
	return (
		<StyledPressable
			onPress={onPress}
			className={clsx('ios:w-[48%] aspect-square justify-between rounded-3xl p-4 md:aspect-auto md:h-40')}
		>
			<View>
				<StyledText type="title">{item}</StyledText>
				<StyledText type="bodysecondary" className={clsx('text-secondaryLabel dark:text-secondaryLabel_dark')}>
					{description}
				</StyledText>
			</View>
			<View className={clsx('flex-row items-center justify-end gap-2')}>
				<AirQualityIndicator fill={colorIndicator} />
				<StyledText type="data">
					{data}
					{units}
				</StyledText>
			</View>
		</StyledPressable>
	);
};
