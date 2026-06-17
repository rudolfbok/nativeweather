import { useTranslate } from '@tolgee/react';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { clsx } from 'clsx';
import { MoveDown, MoveUp, Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import { extractCity } from 'app/utils/helpers/extractCity';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { isCityInFavorites } from 'app/storage/crudMMKVService';
import { useEffect } from 'react';

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
	condition: any;
	textColor: string;
	arrowcolor: string;
	strokeWidth?: number;
	displayTime: boolean;
	colorScheme?: any;
	displayShadow?: boolean;
	conditionStyle?: string;
}

const textShadowStyle = {
	textShadowColor: 'rgba(0,0,0,0.5)',
	textShadowOffset: { width: 2, height: 2 },
	textShadowRadius: 4,
};

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
}: MainWeatherProps) => {
	const { weatherData } = useWeather();
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
		<View className={clsx('relative flex items-center gap-2 overflow-hidden rounded-3xl p-4')}>
			<View pointerEvents="none" className={clsx('absolute inset-0 z-0')}>
				<View className={clsx('absolute -top-[435px] left-1/2 -translate-x-1/2')}>
					<WeatherLandscape code={code} isDay={isDay} />
				</View>
				<View className={clsx('absolute inset-0 bg-black/25')} />
			</View>
			<View className={clsx('relative z-10 flex-col items-center')}>
				<StyledText type="city" className={clsx('text-center !text-white')} style={textShadowStyle}>
					{name}
				</StyledText>
				<StyledText type="country" className={clsx('!text-white opacity-70')} style={textShadowStyle}>
					{country}
				</StyledText>
			</View>
			<View className={clsx('relative z-10 flex-row items-center justify-center gap-4')}>
				<WeatherIcon isDay={isDay} code={code} width={100} height={100} strokeWidth={0} source={currentSource} />
				<View className={clsx('items-center')}>
					<StyledText type="maintemp" className={clsx('pl-3 !text-white')} style={textShadowStyle}>
						{switchTemp({
							celsius: currentTempC,
							fahrenheit: currentTempF,
							currentTemp: currentTemperature,
						})}
					</StyledText>
					<View className={clsx('flex flex-row items-center gap-1')}>
						<View className={clsx('flex flex-row items-center')}>
							<MoveDown size={18} color="white" />
							<StyledText type="body" className="!text-white" style={textShadowStyle}>
								{switchTemp({
									celsius: minTempC,
									fahrenheit: minTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
						<View className={clsx('flex flex-row items-center')}>
							<MoveUp size={18} color="white" />
							<StyledText type="body" className="!text-white" style={textShadowStyle}>
								{switchTemp({
									celsius: maxTempC,
									fahrenheit: maxTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText type="body" className="!text-white" style={textShadowStyle}>
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
			<View className={clsx('relative z-10 rounded-3xl px-4 py-2 backdrop-blur-xl', conditionStyle)}>
				<StyledText type="title" className="!text-white" style={textShadowStyle}>
					{condition}
				</StyledText>
			</View>
			<Pressable
				onPress={() => handleFavoriteToggle(extractCity(weatherData))}
				className={clsx('native:hidden absolute bottom-4 right-4 z-20 lg:p-2')}
			>
				<Star color="#FE9804" fill={isFavorite ? '#FE9804' : 'transparent'} size={30} />
			</Pressable>
			{/* {showWorldTime && displayTime && (
				<View className={clsx('flex flex-row items-center justify-center')}>
					<StyledText type="localtime" className={clsx('font-semibold')}>
						{getLocalTimeNow(weatherData!.location.tzId)}
					</StyledText>
				</View>
			)} */}
		</View>
	);
};
