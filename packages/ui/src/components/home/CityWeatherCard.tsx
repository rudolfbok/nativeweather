import { formatLocalTime, formatTemperature, getConditionLabelKey, getLandscapeKey } from '@nativeweather/core';
import { useStorageBoolean, useStorageString } from '@nativeweather/core';
import type { CityCard } from '@nativeweather/types';
import { useTolgee, useTranslate } from '@tolgee/react';
import { Pressable, View } from 'react-native';
import { getLandscapeColor } from '../../utils/mappings/landscapeColors';
import { WeatherIcon } from '../../utils/mappings/weatherIcons';
import { Text } from '../common/Text';

/** Layout of a list of these cards: one column on phones, more on wide web screens. */
export const cityCardGrid = 'gap-4 web:grid web:grid-cols-1 web:md:grid-cols-2 web:lg:grid-cols-3 web:xl:grid-cols-4';

interface CityWeatherCardProps {
	name: string;
	region: string;
	weather: CityCard;
	onPress: () => void;
}

export const CityWeatherCard = ({ name, region, weather, onPress }: CityWeatherCardProps) => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const [currentTemp] = useStorageString('currentTemp');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const { current, location } = weather;
	const sky = getLandscapeColor(getLandscapeKey(current.condition.code), current.isDay);

	return (
		<Pressable
			onPress={onPress}
			className="min-h-[134px] w-full flex-row items-center justify-between gap-4 rounded-3xl p-4 select-none active:opacity-80 web:hover:opacity-90"
			style={{ backgroundColor: `${sky}E6` }}
		>
			<View className="flex-1 gap-1">
				<View>
					<Text type="sectiontitle" className="text-white" numberOfLines={1}>
						{name}
					</Text>
					<Text type="caption" className="font-semibold text-white opacity-70" numberOfLines={1}>
						{region}
					</Text>
				</View>
				<View>
					<Text type="title" className="text-white">
						{formatTemperature({ celsius: current.tempC, fahrenheit: current.tempF, currentTemp })}
					</Text>
					<Text type="body" className="font-semibold text-white" numberOfLines={1}>
						{t(getConditionLabelKey(current.condition.code, current.isDay))}
					</Text>
				</View>
			</View>
			<View className="items-center">
				<WeatherIcon code={current.condition.code} isDay={current.isDay} size={80} strokeWidth={0} />
				{showWorldTime && (
					<Text type="caption" className="text-white opacity-70">
						{formatLocalTime(location.tzId, language)}
					</Text>
				)}
			</View>
		</Pressable>
	);
};
