import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { DotIndicator } from 'app/components/icons/DotIndicator';
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
			className={clsx('native:w-[48%] web:w-full h-[170px] basis-[48%] justify-between rounded-3xl p-4 md:h-40')}
			liquidGlass={true}
		>
			<View>
				<StyledText type="title">{item}</StyledText>
				<StyledText type="bodysecondary" className={clsx('opacity-70')}>
					{description}
				</StyledText>
			</View>
			<View className={clsx('flex-row items-center justify-end gap-2')}>
				<DotIndicator fill={colorIndicator} />
				<StyledText type="data">
					{data}
					{units}
				</StyledText>
			</View>
		</StyledPressable>
	);
};
