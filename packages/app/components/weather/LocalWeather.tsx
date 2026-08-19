'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/styled/RoundView';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { CityCard } from './CityCard';

interface LocalWeatherProps {
	error?: boolean;
}

export const LocalWeather = ({ error = false }: LocalWeatherProps) => {
	const { t } = useTranslate('weather');
	const localWeatherData = useLocalWeather((state) => state.localWeatherData);
	const { handleCityPress } = useSearchController();

	if (error) {
		return (
			<View className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
				<RoundView className={clsx('p-4 lg:w-fit')}>
					<StyledText type="body" className={clsx('text-center font-semibold !text-red-500')}>
						{t('localweather.error.notavailable')}
					</StyledText>
					<StyledText type="body" className={clsx('text-center')}>
						{t('localweather.error.followup')}
					</StyledText>
				</RoundView>
			</View>
		);
	}

	if (!localWeatherData) {
		return (
			<View className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
				<View
					className={clsx(
						'bg-systemBackground dark:bg-secondarySystemBackground_dark web:animate-pulse h-[132px] w-full rounded-3xl'
					)}
				/>
			</View>
		);
	}

	return (
		<View className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
			<CityCard
				onPress={() => handleCityPress(localWeatherData.location)}
				city={localWeatherData.location.name}
				conditionCode={localWeatherData.current.condition.code}
				isDay={localWeatherData.current.isDay}
				tempC={localWeatherData.current.tempC}
				tempF={localWeatherData.current.tempF}
				displayTime={true}
				timeZone={localWeatherData.location.tzId}
				region={localWeatherData.location.region}
				tintColor={weatherLandscapeBg({
					isDay: localWeatherData.current.isDay,
					code: localWeatherData.current.condition.code,
				})}
			/>
		</View>
	);
};
