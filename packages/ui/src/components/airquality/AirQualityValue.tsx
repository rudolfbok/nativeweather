import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';

interface AirQualityValueProps {
	name: string;
	textColor: string;
	value: string;
	description?: string;
}

const colorMap = {
	good: '!text-good',
	fair: '!text-fair',
	moderate: '!text-moderate',
	sensitive: '!text-sensitive',
	unhealthy: '!text-unhealthy',
	veryunhealthy: '!text-veryunhealthy',
	hazardous: '!text-hazardous',
};

export const AirQualityValue = ({ name, textColor, value, description }: AirQualityValueProps) => {
	return (
		<View>
			<StyledText type="body" className={clsx('font-semibold', colorMap[textColor as keyof typeof colorMap])}>
				{name}
			</StyledText>
			<StyledText type="body" className={clsx('mb-1 font-semibold')}>
				{value}
			</StyledText>
			{description && <StyledText type="body">{description}</StyledText>}
		</View>
	);
};
