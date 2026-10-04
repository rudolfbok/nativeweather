import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ArrowDownIcon } from '@nativeweather/ui/components/icons/ui/ArrowDownIcon';
import { ArrowUpIcon } from '@nativeweather/ui/components/icons/ui/ArrowUpIcon';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { isCityInFavorites } from '@nativeweather/core/database/crudMMKVService';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useFavoriteCities } from '@nativeweather/ui/hooks/weather/useFavoriteCities';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { extractCity } from '@nativeweather/core/utils/extractCity';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { WeatherLandscape } from '@nativeweather/ui/utils/mappings/landscapes';
import { clsx } from 'clsx';
import { Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';

interface MainWeatherProps {
	name?: string;
	country?: string;
	minTempC: number;
	minTempF: number;
	currentTempC: number;
	currentTempF: number;
	maxTempC: number;
	maxTempF: number;
	feelslike: boolean;
	feelsLikeC?: number;
	feelsLikeF?: number;
	isDay: 0 | 1;
	code: number | null;
	condition: string;
	displayShadow?: boolean;
	conditionStyle?: string;
	dailyModal?: boolean;
}

export const MainWeather = ({
	name,
	country,
	minTempC,
	minTempF,
	currentTempC,
	currentTempF,
	maxTempC,
	maxTempF,
	feelslike,
	feelsLikeC,
	feelsLikeF,
	isDay,
	code,
	condition,
	conditionStyle = '!bg-transparent',
	dailyModal = false,
}: MainWeatherProps) => {
	const weatherData = useWeather((state) => state.weatherData);
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();

	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	return (
		<View className={clsx('relative flex items-center gap-2 overflow-hidden rounded-3xl p-4', dailyModal && 'gap-0')}>
			<View className={clsx('pointer-events-none absolute inset-0 z-0')}>
				<View
					className={clsx(
						'absolute -bottom-[10px] left-1/2 -translate-x-1/2 scale-x-[2]',
						dailyModal && '-top-[510px]'
					)}
				>
					<WeatherLandscape code={code} isDay={isDay} />
				</View>
			</View>
			{name && country && (
				<View className={clsx('relative z-10 flex-col items-center')}>
					<StyledText type="herotitle" className={clsx('text-center !text-white', '[text-shadow:0_0_1px_#000000]')}>
						{name}
					</StyledText>
					<StyledText type="locationmeta" className={clsx('!text-white opacity-70', '[text-shadow:0_0_1px_#000000]')}>
						{country}
					</StyledText>
				</View>
			)}
			<View className={clsx('relative z-10 flex-row items-center justify-center gap-4')}>
				<WeatherIcon isDay={isDay} code={code} width={100} height={100} strokeWidth={0} />
				<View className={clsx('items-center')}>
					<StyledText type="display" className={clsx('pl-3', '!text-white', '[text-shadow:0_0_1px_#000000]')}>
						{formatTemperature({
							celsius: currentTempC,
							fahrenheit: currentTempF,
							currentTemp: currentTemperature,
						})}
					</StyledText>
					<View className={clsx('flex flex-row items-center gap-1')}>
						<View className={clsx('flex flex-row items-center')}>
							<ArrowDownIcon />
							<StyledText type="body" className={clsx('!text-white', '[text-shadow:0_0_1px_#000000]')}>
								{formatTemperature({
									celsius: minTempC,
									fahrenheit: minTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
						<View className={clsx('flex flex-row items-center')}>
							<ArrowUpIcon />
							<StyledText type="body" className={clsx('!text-white', '[text-shadow:0_0_1px_#000000]')}>
								{formatTemperature({
									celsius: maxTempC,
									fahrenheit: maxTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText type="body" className={clsx('!text-white', '[text-shadow:0_0_1px_#000000]')}>
							{t('feelslike')}{' '}
							{formatTemperature({
								celsius: feelsLikeC ?? 0,
								fahrenheit: feelsLikeF ?? 0,
								currentTemp: currentTemperature,
							})}
						</StyledText>
					)}
				</View>
			</View>
			<RoundView className={clsx('relative z-10 rounded-3xl px-4 py-2 backdrop-blur-lg', conditionStyle)}>
				<StyledText type="title" className={clsx('!text-white', '[text-shadow:0_0_1px_#000000]')}>
					{condition}
				</StyledText>
			</RoundView>
			<Pressable
				onPress={() => {
					if (weatherData) handleFavoriteToggle(extractCity(weatherData));
				}}
				className={clsx('absolute bottom-4 right-4 z-20 lg:p-2', dailyModal && 'hidden')}
			>
				<Star color="#FE9804" fill={isFavorite ? '#FE9804' : 'transparent'} size={30} />
			</Pressable>
		</View>
	);
};
