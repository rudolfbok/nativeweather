import { formatTemperature, getConditionLabelKey, useStorageString } from '@/core';
import type { NormalizedData } from '@nativeweather/types';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { clsx } from 'clsx';
import { ArrowDownIcon } from '../icons/ui/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ui/ArrowUpIcon';
import { Text } from '../common/Text';
import { WeatherIcon } from '../../utils/mappings/weatherIcons';
import { WeatherLandscape } from '../../utils/mappings/landscapes';

// White text over the landscape needs a thin outline to stay readable on light skies.
const textOutline = { textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 1 };
const onLandscape = 'text-white';

interface MainWeatherProps {
	weather: NormalizedData;
	/** Shows that forecast day instead of the current conditions. */
	dayIndex?: number;
	className?: string;
}

export const MainWeather = ({ weather, dayIndex, className }: MainWeatherProps) => {
	const { t } = useTranslate('weather');
	const [currentTemp] = useStorageString('currentTemp');
	const isCurrent = dayIndex === undefined;
	const day = weather.forecast.forecastday[dayIndex ?? 0]?.day;
	const isDay = isCurrent ? weather.current.isDay : 1;
	const code = isCurrent ? weather.current.condition.code : (day?.condition.code ?? weather.current.condition.code);
	const temperature = (celsius: number, fahrenheit: number) => formatTemperature({ celsius, fahrenheit, currentTemp });

	return (
		<View className={clsx('items-center gap-2 overflow-hidden rounded-3xl p-4', !isCurrent && 'gap-0', className)}>
			<View pointerEvents="none" className="absolute inset-0 items-center">
				<View className="absolute -bottom-6 scale-x-200 web:-bottom-2.5">
					<WeatherLandscape code={code} isDay={isDay} />
				</View>
			</View>

			{/* Native shows the city in the navigation header instead. */}
			{isCurrent && (
				<View className="hidden items-center web:flex">
					<Text type="herotitle" className={clsx('text-center', onLandscape)} style={textOutline}>
						{weather.location.name}
					</Text>
					<Text type="locationmeta" className={onLandscape} style={textOutline}>
						{weather.location.country}
					</Text>
				</View>
			)}

			<View className="flex-row items-center justify-center gap-4">
				<WeatherIcon code={code} isDay={isDay} size={100} strokeWidth={0} />
				<View className="items-center">
					<Text type="display" className={clsx('pl-3', onLandscape)} style={textOutline}>
						{isCurrent
							? temperature(weather.current.tempC, weather.current.tempF)
							: day && temperature(day.maxTempC, day.maxTempF)}
					</Text>
					{day && (
						<View className="flex-row items-center gap-1">
							<View className="flex-row items-center">
								<ArrowDownIcon />
								<Text type="body" className={onLandscape} style={textOutline}>
									{temperature(day.minTempC, day.minTempF)}
								</Text>
							</View>
							<View className="flex-row items-center">
								<ArrowUpIcon />
								<Text type="body" className={onLandscape} style={textOutline}>
									{temperature(day.maxTempC, day.maxTempF)}
								</Text>
							</View>
						</View>
					)}
					{isCurrent && (
						<Text type="body" className={onLandscape} style={textOutline}>
							{t('feelslike')} {temperature(weather.current.feelsLikeC, weather.current.feelsLikeF)}
						</Text>
					)}
				</View>
			</View>

			<View className="rounded-3xl border border-white/20 bg-white/15 px-4 py-2 web:backdrop-blur-lg">
				<Text type="title" className={onLandscape} style={textOutline}>
					{t(getConditionLabelKey(code, isDay))}
				</Text>
			</View>
		</View>
	);
};
