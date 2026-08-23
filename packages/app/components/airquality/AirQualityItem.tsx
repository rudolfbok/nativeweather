import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { DotIndicator } from 'app/components/icons/ui/DotIndicator';
import { border } from 'app/constants/border';
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
			className={clsx(
				'ios:w-[48%] ios:basis-[48%] macos:flex-grow web:w-full ios:h-[173px] macos:h-[130px] macos:aspect-video web:h-full aspect-square justify-between rounded-3xl p-4',
				border
			)}
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
