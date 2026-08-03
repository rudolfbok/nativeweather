import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useStorageString } from 'app/storage/useStorage';
import { WeatherLandscape } from 'app/utils/mappings/mapLandscapes';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { MoveDown, MoveUp } from 'lucide-react-native';
import { View } from 'react-native';

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
	textShadowOffset: { width: 1, height: 1 },
	textShadowRadius: 3,
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
}: MainWeatherProps) => {
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');

	return (
		<View
			className="relative items-center justify-center overflow-hidden rounded-3xl p-4"
			// style={{ backgroundColor: isDay === 1 ? '#3979b8' : '#091331' }}
		>
			<View pointerEvents="none" className="absolute -bottom-10">
				<WeatherLandscape code={code} isDay={isDay} />
			</View>
			{name && country && (
				<View className="relative z-10 items-center">
					<StyledText type="city" className="text-center !text-white" style={textShadowStyle}>
						{name}
					</StyledText>
					<StyledText type="country" className="!text-white opacity-70" style={textShadowStyle}>
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
					<StyledText type="maintemp" className="pl-3 !text-white" style={textShadowStyle}>
						{switchTemp({ celsius: currentTempC, fahrenheit: currentTempF, currentTemp: currentTemperature })}
					</StyledText>
					<View className="flex-row items-center gap-1">
						<View className="flex-row items-center">
							<MoveDown size={18} color="white" />
							<StyledText type="body" className="!text-white" style={textShadowStyle}>
								{switchTemp({ celsius: minTempC, fahrenheit: minTempF, currentTemp: currentTemperature })}
							</StyledText>
						</View>
						<View className="flex-row items-center">
							<MoveUp size={18} color="white" />
							<StyledText type="body" className="!text-white" style={textShadowStyle}>
								{switchTemp({ celsius: maxTempC, fahrenheit: maxTempF, currentTemp: currentTemperature })}
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
			<View className="relative z-10 rounded-full bg-black/10 px-4 py-2">
				<StyledText type="title" className="!text-white" style={textShadowStyle}>
					{condition}
				</StyledText>
			</View>
		</View>
	);
};
