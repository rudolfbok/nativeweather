'use client';

import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import type { LocalWeatherErrorKind } from '@nativeweather/ui/hooks/location/locationError';
import { useSearchController } from '@nativeweather/ui/hooks/search/useSearchController';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { weatherLandscapeBg } from '@nativeweather/core/utils/mappings/landscapeColors';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { Card } from '../card/Card';
import { CardSkeleton } from '../card/CardSkeleton';

interface LocalWeatherProps {
	error?: LocalWeatherErrorKind | null;
}

export const LocalWeather = ({ error = null }: LocalWeatherProps) => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const { handleCityPress } = useSearchController();
	const containerClassName =
		Platform.OS === 'web' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'w-full gap-4';

	if (error) {
		return (
			<View className={clsx(containerClassName)}>
				<RoundView className={clsx('min-h-[134px] justify-center gap-2 p-4 lg:w-fit')}>
					<StyledText type="body" className={clsx('text-center font-semibold !text-red-500')}>
						{t(`localweather.error.${error}.title`)}
					</StyledText>
					<StyledText type="body" className={clsx('text-center')}>
						{t(`localweather.error.${error}.message`)}
					</StyledText>
				</RoundView>
			</View>
		);
	}

	if (!localWeatherData) {
		return (
			<View className={clsx(containerClassName)}>
				<CardSkeleton />
			</View>
		);
	}

	return (
		<View className={clsx(containerClassName)}>
			<Card
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
