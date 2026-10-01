import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ArrowDownIcon } from '@nativeweather/ui/components/icons/ui/ArrowDownIcon';
import { ArrowUpIcon } from '@nativeweather/ui/components/icons/ui/ArrowUpIcon';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { textOutline } from '@nativeweather/core/constants/textOutline';
import { isCityInFavorites } from '@nativeweather/core/database/crudMMKVService';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useFavoriteCities } from '@nativeweather/ui/hooks/weather/useFavoriteCities';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { extractCity } from '@nativeweather/core/utils/extractCity';
import { switchTemp } from '@nativeweather/core/utils/formatting/formatTemperature';
import { WeatherLandscape } from '@nativeweather/ui/utils/mappings/landscapes';
import { clsx } from 'clsx';
import { Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

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
	code: number;
	condition: string;
	displayShadow?: boolean;
	conditionStyle?: string;
	dailyModal?: boolean;
}

const landscapeStyle = StyleSheet.create({
	dailyFrame: {
		position: 'absolute',
		bottom: -40,
		left: '50%',
		width: 900,
		height: 710,
		marginLeft: -450,
	},
});

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
	dailyModal = false,
}: MainWeatherProps) => {
	const weatherData = useWeather((state) => state.weatherData);
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();

	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	return (
		<View
			className="relative items-center justify-center overflow-hidden rounded-3xl p-4"
			// style={{ backgroundColor: isDay === 1 ? '#3979b8' : '#091331' }}
		>
			<View
				pointerEvents="none"
				className="absolute -bottom-10"
				style={dailyModal ? landscapeStyle.dailyFrame : undefined}
			>
				<WeatherLandscape code={code} isDay={isDay} width={dailyModal ? 900 : undefined} height={710} />
			</View>
			{name && country && (
				<View className="relative z-10 items-center">
					<StyledText type="herotitle" className="text-center !text-white" style={textOutline}>
						{name}
					</StyledText>
					<StyledText type="locationmeta" className="!text-white opacity-70" style={textOutline}>
						{country}
					</StyledText>
				</View>
			)}
			<View className="relative z-10 my-4 flex-row items-center justify-center gap-4">
				<WeatherIcon
					isDay={isDay}
					code={code}
					width={100}
					height={100}
					strokeWidth={0}
					source={currentSource ?? 'weatherapi'}
				/>
				<View className="items-center">
					<StyledText type="display" className="pl-3 !text-white" style={textOutline}>
						{switchTemp({ celsius: currentTempC, fahrenheit: currentTempF, currentTemp: currentTemperature })}
					</StyledText>
					<View className="flex-row items-center gap-1">
						<View className="flex-row items-center">
							<ArrowDownIcon />
							<StyledText type="body" className="!text-white" style={textOutline}>
								{switchTemp({ celsius: minTempC, fahrenheit: minTempF, currentTemp: currentTemperature })}
							</StyledText>
						</View>
						<View className="flex-row items-center">
							<ArrowUpIcon />
							<StyledText type="body" className="!text-white" style={textOutline}>
								{switchTemp({ celsius: maxTempC, fahrenheit: maxTempF, currentTemp: currentTemperature })}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText type="body" className="!text-white" style={textOutline}>
							{t('feelslike')}{' '}
							{switchTemp({
								celsius: feelsLikeC ?? 0,
								fahrenheit: feelsLikeF ?? 0,
								currentTemp: currentTemperature,
							})}
						</StyledText>
					)}
				</View>
			</View>
			<View className="relative z-10 rounded-full bg-black/10 px-4 py-2">
				<StyledText type="title" className="!text-white" style={textOutline}>
					{condition}
				</StyledText>
			</View>
			<Pressable
				onPress={() => {
					if (weatherData) handleFavoriteToggle(extractCity(weatherData));
				}}
				className={clsx('absolute bottom-4 right-4 z-20 lg:p-2', dailyModal && 'hidden')}
				style={{ cursor: 'pointer' }}
			>
				<Star color="#FE9804" fill={isFavorite ? '#FE9804' : 'transparent'} size={30} />
			</Pressable>
		</View>
	);
};
