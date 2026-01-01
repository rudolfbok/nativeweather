import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';

interface AirQualityValueProps {
	name: string;
	textcolor: string;
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

export const AirQualityValue = ({ name, textcolor, value, description }: AirQualityValueProps) => {
	return (
		<View>
			<StyledText type="body" className={clsx('font-semibold', colorMap[textcolor as keyof typeof colorMap])}>
				{name}
			</StyledText>
			<StyledText type="body" className={clsx('mb-1 font-semibold')}>
				{value}
			</StyledText>
			{description && <StyledText type="body">{description}</StyledText>}
		</View>
	);
};
