'use client';

import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useSearchController } from 'app/hooks/useSearchController';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';
import { CityCard } from '../CityCard';

type LocationError = 'not-supported' | 'permission-denied' | 'position-unavailable' | 'timeout' | 'unknown';

export const LocalWeather = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData, setLocalWeatherData } = useLocalWeather();
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const { handleCityPress } = useSearchController();

	const getWeather = () =>
		new Promise(async (resolve, reject: (reason: LocationError) => void) => {
			if (!navigator.geolocation) {
				reject('not-supported');
				return;
			}

			navigator.geolocation.getCurrentPosition(
				async ({ coords }) => {
					try {
						const result = await fetchWeather([coords.latitude, coords.longitude]);
						resolve(result);
					} catch {
						reject('unknown');
					}
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							reject('permission-denied');
							break;
						case error.POSITION_UNAVAILABLE:
							reject('position-unavailable'); // ← tvůj kCLErrorLocationUnknown
							break;
						case error.TIMEOUT:
							reject('timeout');
							break;
						default:
							reject('unknown');
					}
				},
				{
					enableHighAccuracy: false,
					timeout: 10_000,
					maximumAge: 60_000,
				}
			);
		});

	if (!localWeatherData) {
		return null;
	}

	return (
		<View>
			<StyledText type="screentitle" className={clsx('mb-2 !text-2xl')}>
				{t('localweather.title')}
			</StyledText>
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
		</View>
	);
};
