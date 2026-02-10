'use client';

import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useCurrentLocation } from 'app/hooks/useCurrentLocation';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useSearchController } from 'app/hooks/useSearchController';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';
import { CityCard } from '../CityCard';

export const LocalWeather = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const { getLocalWeather, error } = useCurrentLocation();
	const { handleCityPress } = useSearchController();

	useEffect(() => {
		getLocalWeather();
	}, []);

	if (error) {
		return (
			<View className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
				<RoundView className={clsx('p-4 lg:w-fit')}>
					<StyledText type="body" className="text-center font-semibold !text-red-500">
						{t('localweather.error.notavailable')}
					</StyledText>
					<StyledText type="body" className="text-center">
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
						'bg-systemBackground dark:bg-secondarySystemBackground_dark h-[132px] w-full animate-pulse rounded-3xl'
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
				isDay={localWeatherData.current.is_day}
				tempC={localWeatherData.current.temp_c}
				tempF={localWeatherData.current.temp_f}
				displayTime={true}
				timeZone={localWeatherData.location.tz_id}
				region={localWeatherData.location.region}
			/>
		</View>
	);
};
