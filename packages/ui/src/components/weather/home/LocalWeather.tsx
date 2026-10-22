'use client';

import { extractCity } from '@nativeweather/core/utils/extractCity';
import { weatherLandscapeBg } from '@nativeweather/core/utils/mappings/landscapeColors';
import { StyledText } from '../../common/styled/StyledText';
import type { LocalWeatherErrorKind } from '@nativeweather/core/hooks/location/locationError';
import { useSearchController } from '@nativeweather/ui/hooks/search/useSearchController';
import { useLocalWeather } from '@nativeweather/core/hooks/weather/useLocalWeather';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { Card } from '../card/Card';
import { CardSkeleton } from '../card/CardSkeleton';

export const LocalWeather = ({ error = null }: { error?: LocalWeatherErrorKind | null }) => {
	const { t } = useTranslate('weather');
	const { localWeatherData } = useLocalWeather();
	const { handleCityPress } = useSearchController();
	const containerClassName =
		Platform.OS === 'web' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'pt-1 w-full gap-4';

	if (error) {
		return (
			<View className={clsx(containerClassName)}>
				<View
					className={clsx(
						'macos:dark:bg-tertiarySystemBackground_dark macos:bg-secondarySystemBackground flex min-h-[134px] justify-center gap-2 overflow-hidden rounded-3xl bg-systemBackground p-4 lg:w-fit dark:bg-secondarySystemBackground_dark'
					)}
				>
					<StyledText type="body" className={clsx('text-center font-semibold !text-red-500')}>
						{t(`localweather.error.${error}.title`)}
					</StyledText>
					<StyledText type="body" className={clsx('text-center')}>
						{t(`localweather.error.${error}.message`)}
					</StyledText>
				</View>
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
				region={extractCity(localWeatherData).region}
				tintColor={weatherLandscapeBg({
					isDay: localWeatherData.current.isDay,
					code: localWeatherData.current.condition.code,
				})}
			/>
		</View>
	);
};
