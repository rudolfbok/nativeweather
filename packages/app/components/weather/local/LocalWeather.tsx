import { useTranslate } from '@tolgee/react';
import { fetchWeather } from 'app/api/fetchWeather';
import { useLocalWeather } from 'app/hooks/useLocalWeather';
import { useSearchController } from 'app/hooks/useSearchController';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { RoundView } from '../../common/RoundView';
import { StyledButton } from '../../common/StyledButton';
import { StyledText } from '../../common/StyledText';
import { CityCard } from '../CityCard';

export const LocalWeather = () => {
	const { t } = useTranslate('weather');
	const { localWeatherData, setLocalWeatherData } = useLocalWeather();
	const { handleCityPress } = useSearchController();
	const [showLocalWeather, setShowLocalWeather] = useStorageBoolean('showLocalWeather');
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	async function currentLocationClick() {
		try {
			setLoading(true);
			setErrorMsg(null);

			// This will always show the permission dialog
			const { status } = await requestForegroundPermissionsAsync();

			if (status === 'granted') {
				await getCurrentLocationWeather();
			} else {
				setErrorMsg(t('localweather.error.permission'));
				setLoading(false);
			}
		} catch (error) {
			console.error('Error requesting location permission:', error);
			setErrorMsg(t('localweather.error.location'));
			setLoading(false);
		}
	}

	const getCurrentLocationWeather = async () => {
		try {
			// Request location permission
			const { status } = await requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg(t('localweather.error.permission'));
				setLoading(false);
				return;
			}

			// Get current position
			const currentLocation = await getCurrentPositionAsync({
				accuracy: Accuracy.Balanced,
			});

			const { latitude, longitude } = currentLocation.coords;

			const weatherData = await fetchWeather(`${latitude},${longitude}`);

			if (!weatherData) {
				setErrorMsg(t('localweather.error.fetch'));
			} else {
				setLocalWeatherData(weatherData);
				setErrorMsg(null);
			}
		} catch (error) {
			console.error('Error getting location weather:', error);
			setErrorMsg(t('localweather.error.location'));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCurrentLocationWeather();
	}, []);

	// if (loading) {
	// 	return <LoadingIndicator text={t('localweather.loading')} />;
	// }

	if (errorMsg) {
		return (
			<View>
				<StyledText type="screentitle" className={clsx('mb-2 !text-2xl')}>
					{t('localweather.title')}
				</StyledText>
				<View className={clsx('w-full gap-4')}>
					<RoundView className={clsx('w-full items-center place-self-center p-4 md:w-fit')}>
						<StyledText type="body" className={clsx('text-center')}>
							{t('localweather.permission')}
						</StyledText>
					</RoundView>
					<View className={clsx('flex w-full flex-col items-center justify-center gap-3 lg:flex-row')}>
						<StyledButton onPress={() => currentLocationClick()} text={t('localweather.button.allow')} />
						<StyledButton onPress={() => setShowLocalWeather(false)} text={t('localweather.button.forbid')} />
					</View>
				</View>
			</View>
		);
	}

	if (!localWeatherData) {
		return null;
	}

	if (localWeatherData) {
		return (
			<View>
				<StyledText type="screentitle" className={clsx('mb-2 !text-2xl')}>
					{t('localweather.title')}
				</StyledText>
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
	}
};
