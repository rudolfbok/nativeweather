import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { MoveDown, MoveUp } from 'lucide-react-native';
import { View } from 'react-native';

const textShadowStyle = {
	textShadowColor: 'rgba(0,0,0,0.5)',
	textShadowOffset: { width: 2, height: 2 },
	textShadowRadius: 4,
};

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
	conditionText?: string;
	displayTime: boolean;
	colorScheme?: any;
	displayShadow?: boolean;
	conditionStyle?: string;
}

export const MainWeather = ({
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
	textColor,
	arrowcolor,
	strokeWidth,
	conditionText,
	colorScheme,
	displayShadow = true,
}: MainWeatherProps) => {
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');

	return (
		<View className={clsx('relative mt-2 items-center gap-2')}>
			<View className={clsx('w-[80%] flex-row items-center')}>
				<View className={clsx('w-1/2 items-center')}>
					<WeatherIcon
						isDay={isDay}
						code={code}
						width={90}
						height={90}
						strokeWidth={strokeWidth}
						source={currentSource}
					/>
				</View>
				<View className={clsx('w-1/2 items-center')}>
					<StyledText type="maintemp" className={clsx('pl-4', textColor)} style={displayShadow && textShadowStyle}>
						{useSwitchTemp({
							celsius: currentTempC,
							fahrenheit: currentTempF,
							currentTemp: currentTemperature,
						})}
					</StyledText>
					<View className={clsx('flex flex-row items-center gap-1')}>
						<View className={clsx('flex flex-row items-center')}>
							<MoveDown size={18} color={arrowcolor} />
							<StyledText type="body" className={clsx(textColor)} style={displayShadow && textShadowStyle}>
								{useSwitchTemp({
									celsius: minTempC,
									fahrenheit: minTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
						<View className={clsx('flex flex-row items-center')}>
							<MoveUp size={18} color={arrowcolor} />
							<StyledText type="body" className={clsx(textColor)} style={displayShadow && textShadowStyle}>
								{useSwitchTemp({
									celsius: maxTempC,
									fahrenheit: maxTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText
							type="subtitle"
							className={clsx('font-semibold', textColor)}
							style={displayShadow && textShadowStyle}
						>
							{t('feelslike')}{' '}
							{useSwitchTemp({
								celsius: feelsLikeC ?? 0,
								fahrenheit: feelsLikeF ?? 0,
								currentTemp: currentTemperature,
							})}
						</StyledText>
					)}
				</View>
			</View>

			<RoundView
				style={{ paddingHorizontal: 16, paddingVertical: 8 }}
				liquidGlass={true}
				colorScheme={colorScheme}
				glassEffectStyle="clear"
			>
				<StyledText
					type="subtitle"
					className={clsx('text-center text-xl font-bold', conditionText)}
					style={displayShadow && textShadowStyle}
				>
					{condition}
				</StyledText>
			</RoundView>
			{/* {showWorldTime && displayTime && (
					<View className={clsx('mt-1 flex flex-row items-center justify-center')}>
						<StyledText type="localtime">{useLocalTimeNow(weatherData!.location.tzId)}</StyledText>
					</View>
				)} */}
		</View>
	);
};
