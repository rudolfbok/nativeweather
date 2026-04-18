import { useTolgee, useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { clsx } from 'clsx';
import { MoveDown, MoveUp } from 'lucide-react-native';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';

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
	displayTime = true,
	conditionStyle = '!bg-transparent',
}: MainWeatherProps) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const [currentTemperature] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const arrowColor = useSwitchColors('black', 'white');
	const tolgee = useTolgee();

	const useLocalTimeNow = (timezone: string): string => {
		const lang = tolgee.getLanguage();
		const localtime = DateTime.now()
			.setZone(timezone)
			.toFormat(lang === 'en-US' ? 'hh:mm a' : 'HH:mm');
		return localtime;
	};

	return (
		<View className={clsx('relative items-center')}>
			<View className={clsx('flex-col items-center justify-center')}>
				<View className={clsx('flex-col items-center')}>
					<StyledText type="city" className={clsx('text-center')}>
						{name}
					</StyledText>
					<StyledText type="country" className={clsx('text-center')}>
						{country}
					</StyledText>
				</View>
				<WeatherIcon isDay={isDay} code={code} width={120} height={120} strokeWidth={0.5} source={currentSource} />
				<View className={clsx('items-center')}>
					<StyledText type="maintemp" className={clsx('pl-3')}>
						{useSwitchTemp({
							celsius: currentTempC,
							fahrenheit: currentTempF,
							currentTemp: currentTemperature,
						})}
					</StyledText>
					<View className={clsx('flex flex-row items-center gap-1')}>
						<View className={clsx('flex flex-row items-center')}>
							<MoveDown size={18} color={arrowColor} />
							<StyledText type="body">
								{useSwitchTemp({
									celsius: minTempC,
									fahrenheit: minTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
						<View className={clsx('flex flex-row items-center')}>
							<MoveUp size={18} color={arrowColor} />
							<StyledText type="body">
								{useSwitchTemp({
									celsius: maxTempC,
									fahrenheit: maxTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText type="body">
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
			<RoundView className={clsx('my-1', conditionStyle)}>
				<StyledText type="title">{condition}</StyledText>
			</RoundView>
			{showWorldTime && displayTime && (
				<View className={clsx('flex flex-row items-center justify-center')}>
					<StyledText type="localtime" className={clsx('font-semibold')}>
						{useLocalTimeNow(weatherData!.location.tzId)}
					</StyledText>
				</View>
			)}
		</View>
	);
};
