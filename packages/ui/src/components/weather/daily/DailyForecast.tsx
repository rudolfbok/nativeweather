import {
	formatTemperature,
	formatWeekday,
	getConditionLabelKey,
	useStorageString,
	useWeather,
} from '@nativeweather/core';
import { useTolgee, useTranslate } from '@tolgee/react';
import { StyleSheet, View } from 'react-native';
import { CardHeader } from '../../common/CardHeader';
import { Pressable } from '../../common/Pressable';
import { RoundView } from '../../common/RoundView';
import { Text } from '../../common/Text';
import { CalendarIcon } from '../../icons/main/CalendarIcon';
import { WeatherIcon } from '../../../utils/mappings/weatherIcons';

export const DailyForecast = ({ onSelectDay }: { onSelectDay: (dayIndex: number) => void }) => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const weatherData = useWeather((state) => state.weatherData);
	const [currentTemp] = useStorageString('currentTemp');

	if (!weatherData) return null;

	const days = weatherData.forecast.forecastday.slice(0, 7);

	return (
		<RoundView>
			<CardHeader icon={<CalendarIcon />} header={t('dailyforecast.title')} className="mb-1 px-4 pt-4" />
			{days.map(({ date, day }, index) => (
				<Pressable key={date} onPress={() => onSelectDay(index)} className="px-4">
					<View
						className="w-full flex-row items-center justify-between border-separator py-2"
						style={index < days.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth }}
					>
						<Text type="body" className="w-14 font-semibold" numberOfLines={1}>
							{index === 0 ? t('dailyforecast.today') : formatWeekday(date, language)}
						</Text>
						<Text type="caption" className="flex-1 text-center">
							{t(getConditionLabelKey(day.condition.code, 1)).toLowerCase()}
						</Text>
						<View className="flex-row items-center">
							<Text type="body" className="w-10 text-center">
								{formatTemperature({ celsius: day.minTempC, fahrenheit: day.minTempF, currentTemp })}
							</Text>
							<View className="items-center justify-center">
								<WeatherIcon code={day.condition.code} isDay={1} size={35} strokeWidth={StyleSheet.hairlineWidth} />
							</View>
							<Text type="body" className="w-10 text-center font-semibold">
								{formatTemperature({ celsius: day.maxTempC, fahrenheit: day.maxTempF, currentTemp })}
							</Text>
						</View>
					</View>
				</Pressable>
			))}
		</RoundView>
	);
};
