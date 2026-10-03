import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { clsx } from 'clsx';
import { StyleSheet, View } from 'react-native';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useTranslate } from '@tolgee/react';
import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';
import { switchTemp } from '@nativeweather/core/utils/formatting/formatTemperature';

interface HourlyItemProps {
	hour: number | string;
	isDay: 0 | 1;
	code: number | null;
	rainChance: number;
	snowChance: number;
	tempC: number;
	tempF: number;
}

export const HourlyItem = ({ hour, isDay, code, rainChance, snowChance, tempC, tempF }: HourlyItemProps) => {
	const { t } = useTranslate('weather');
	const kind = getWeatherCondition(code)?.precipitation;
	const showRain = kind === 'rain' || kind === 'thunder_rain' || kind == null;
	const showSnow = kind === 'snow' || kind === 'thunder_snow' || kind === 'sleet' || kind === 'ice' || kind == null;
	const [currentTemp] = useStorageString('currentTemp');
	return (
		<View className={clsx('min-h-[130px] w-14 select-none items-center justify-center gap-2')}>
			<StyledText type="body" className={clsx('w-full text-center font-medium')} numberOfLines={1}>
				{hour}
			</StyledText>
			<View className={clsx('flex-1 items-center justify-center gap-1')}>
				<WeatherIcon isDay={isDay} code={code} width={40} height={40} strokeWidth={StyleSheet.hairlineWidth} />
				{showRain && rainChance > 10 && (
					<StyledText type="caption" className={clsx('font-semibold !text-primaryblue')}>
						{Math.round(rainChance / 5) * 5}%
					</StyledText>
				)}
				{showSnow && snowChance > 10 && (
					<StyledText type="caption" className={clsx('font-semibold !text-primaryblue')}>
						{kind === 'sleet' || kind === 'ice'
							? `${t('snow.title')} ${Math.round(snowChance / 5) * 5}%`
							: `${Math.round(snowChance / 5) * 5}%`}
					</StyledText>
				)}
			</View>
			<StyledText type="body" className={clsx('font-semibold')}>
				{switchTemp({
					celsius: tempC,
					fahrenheit: tempF,
					currentTemp: currentTemp,
				})}
			</StyledText>
		</View>
	);
};
