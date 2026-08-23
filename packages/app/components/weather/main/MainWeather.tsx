import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/styled/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { isCityInFavorites } from 'app/database/crudMMKVService';
import { useStorageString } from 'app/database/useStorage';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWeather } from 'app/hooks/weather/useWeather';
import { extractCity } from 'app/utils/extractCity';
import { switchTemp } from 'app/utils/formatting/formatTemperature';
import { WeatherLandscape } from 'app/utils/mappings/landscapes';
import { clsx } from 'clsx';
import { MoveDown, MoveUp, Star } from 'lucide-react-native';
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
	code: number;
	condition: string;
	displayShadow?: boolean;
	conditionStyle?: string;
	dailyModal?: boolean;
}

const textShadowStyle = {
	textShadowColor: 'rgba(0,0,0,0.5)',
	textShadowOffset: { width: 2, height: 2 },
	textShadowRadius: 4,
};

const iconShadowStyle = {
	filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))',
} as const;

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
	const [currentSource] = useStorageString('currentSource');
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();

	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	return (
		<>
			<View pointerEvents="none" className={clsx('absolute inset-0 z-0', dailyModal && 'hidden')}>
				<View className={clsx('absolute -bottom-[25px] scale-x-[2]')}>
					<WeatherLandscape code={code} isDay={isDay} />
				</View>
			</View>
			<View className={clsx('flex items-center gap-2 overflow-hidden rounded-3xl p-4', dailyModal && 'gap-0')}>
				<View pointerEvents="none" className={clsx('absolute -bottom-[30px] z-0', !dailyModal && 'hidden')}>
					<WeatherLandscape code={code} isDay={isDay} />
				</View>
				<View className={clsx('relative z-10 flex-row items-center justify-center gap-4')}>
					<WeatherIcon isDay={isDay} code={code} width={100} height={100} strokeWidth={0} source={currentSource} />
					<View className={clsx('items-center')}>
						<StyledText type="maintemp" className={clsx('pl-3', '!text-white')} style={textShadowStyle}>
							{switchTemp({
								celsius: currentTempC,
								fahrenheit: currentTempF,
								currentTemp: currentTemperature,
							})}
						</StyledText>
						<View className={clsx('flex flex-row items-center gap-1')}>
							<View className={clsx('flex flex-row items-center')}>
								<MoveDown size={18} color="white" style={iconShadowStyle} />
								<StyledText type="body" className={clsx('!text-white')} style={textShadowStyle}>
									{switchTemp({
										celsius: minTempC,
										fahrenheit: minTempF,
										currentTemp: currentTemperature,
									})}
								</StyledText>
							</View>
							<View className={clsx('flex flex-row items-center')}>
								<MoveUp size={18} color="white" style={iconShadowStyle} />
								<StyledText type="body" className={clsx('!text-white')} style={textShadowStyle}>
									{switchTemp({
										celsius: maxTempC,
										fahrenheit: maxTempF,
										currentTemp: currentTemperature,
									})}
								</StyledText>
							</View>
						</View>
						{feelslike && (
							<StyledText type="body" className={clsx('!text-white')} style={textShadowStyle}>
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
				<RoundView
					liquidGlass={true}
					glassEffectStyle="clear"
					className={clsx('relative z-10 rounded-3xl px-4 py-2 backdrop-blur-xl', conditionStyle)}
				>
					<StyledText type="title" className={clsx('!text-white')} style={textShadowStyle}>
						{condition}
					</StyledText>
				</RoundView>
				<Pressable
					onPress={() => handleFavoriteToggle(extractCity(weatherData))}
					className={clsx('native:hidden absolute bottom-4 right-4 z-20 lg:p-2', dailyModal && 'hidden')}
				>
					<Star color="#FE9804" fill={isFavorite ? '#FE9804' : 'transparent'} size={30} />
				</Pressable>
			</View>
		</>
	);
};
