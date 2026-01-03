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

export const LocalWeather = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData, setLocalWeatherData } = useLocalWeather();
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const { handleCityPress } = useSearchController();

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			setErrorMsg('not-supported');
			return;
		}

		setLoading(true);

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				const lat = coords.latitude;
				const lon = coords.longitude;
				try {
					const weatherData = await fetchWeather([lat, lon]);
					console.log('Fetched local weather data:', weatherData);
					setLocalWeatherData(weatherData);
				} catch {
					setErrorMsg('fetch-failed');
				} finally {
					setLoading(false);
				}
			},
			() => {
				setErrorMsg('permission-denied');
				setLoading(false);
			},
			{
				enableHighAccuracy: false,
				timeout: 10_000,
			}
		);
	}, []);

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
