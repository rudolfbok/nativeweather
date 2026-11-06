import { getAirQualityScale, getRangeIndex, useStorageString, useWeather } from '@/core';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { Skeleton } from '../common/Skeleton';
import { Text } from '../common/Text';
import { AirQualityIcon } from '../icons/main/AirQualityIcon';
import { ScaleBar } from '../weather/ScaleBar';
import { pollutants } from './pollutants';

// The US scale's gradient stops at 300 although the index goes to 500.
const scaleMax = { euaqi: 100, usaqi: 300 };

export const AirQualityCard = ({ onPress }: { onPress: () => void }) => {
	const { t } = useTranslate('weather');
	const current = useWeather((state) => state.airQualityData?.current);
	const [currentAQI] = useStorageString('currentAQI');

	if (!current) return <Skeleton className="h-32" />;

	const index = currentAQI === 'EU' ? 'euaqi' : 'usaqi';
	const { label, levelKey, value: getValue } = pollutants[index];
	const value = getValue(current);
	const band = getRangeIndex(value, getAirQualityScale(index).bounds);

	return (
		<Pressable onPress={onPress} className="w-full gap-4 rounded-3xl border border-hairline p-4">
			<CardHeader icon={<AirQualityIcon />} header={t('airquality.title')} />
			<View className="my-2">
				<ScaleBar
					type={index === 'euaqi' ? 'eu-aqi' : 'us-aqi'}
					label={t('airquality.title')}
					position={value / scaleMax[index]}
				/>
			</View>
			<View className="flex-row items-center justify-between">
				<Text type="sectiontitle">{`${value} - ${t(`${levelKey}.${band}`)}`}</Text>
				<Text type="body">{label}</Text>
			</View>
		</Pressable>
	);
};
