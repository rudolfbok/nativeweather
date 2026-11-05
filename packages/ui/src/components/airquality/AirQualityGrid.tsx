import { getAirQualityLevel, useWeather } from '@nativeweather/core';
import type { Pollutant } from '@nativeweather/core';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { Pressable } from '../common/Pressable';
import { Text } from '../common/Text';
import { levelBgClass } from '../../utils/mappings/levelClasses';
import { pollutantIds, pollutants } from './pollutants';

export const AirQualityGrid = ({ onOpen }: { onOpen: (pollutant: Pollutant) => void }) => {
	const { t } = useTranslate('weather');
	const current = useWeather((state) => state.airQualityData?.current);

	if (!current) return null;

	return (
		<View className="w-full flex-row flex-wrap gap-4">
			{pollutantIds.map((id) => {
				const { label, itemKey, units, value: getValue } = pollutants[id];
				const value = getValue(current);

				return (
					<Pressable
						key={id}
						onPress={() => onOpen(id)}
						className="aspect-square grow basis-[40%] justify-between rounded-3xl border border-hairline p-4 md:basis-[28%]"
					>
						<View>
							<Text type="title">{label}</Text>
							<Text type="caption" className="opacity-70">
								{t(`airquality.item.${itemKey}`)}
							</Text>
						</View>
						<View className="flex-row items-center justify-end gap-2">
							<View className={`h-2.5 w-2.5 rounded-full ${levelBgClass[getAirQualityLevel(id, value)]}`} />
							<Text type="data">{`${value}${units}`}</Text>
						</View>
					</Pressable>
				);
			})}
		</View>
	);
};
