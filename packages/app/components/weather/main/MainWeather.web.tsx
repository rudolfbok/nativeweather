import { useTolgee, useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import { clsx } from 'clsx';
import { MoveDown, MoveUp } from 'lucide-react-native';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';

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
	textcolor: string;
	arrowcolor: string;
	strokeWidth?: number;
	conditionbg?: boolean;
	displayTime: boolean;
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
	textcolor,
	arrowcolor,
	strokeWidth,
	conditionbg = true,
	displayTime = true,
}: MainWeatherProps) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const [currentTemperature] = useStorageString('currentTemp');
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
		<View className={clsx('relative items-center rounded-3xl')}>
			<View className={clsx('flex-col items-center justify-center')}>
				<View className={clsx('flex-col items-center')}>
					<StyledText type="city" className={clsx('text-center')}>
						{name}
					</StyledText>
					<StyledText type="country" className={clsx('text-center')}>
						{country}
					</StyledText>
				</View>
				<WeatherIcon isDay={isDay} code={code} width={120} height={120} strokeWidth={0.5} />
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
			<View
				className={clsx(
					conditionbg && 'bg-systemBackground dark:bg-secondarySystemBackground_dark mt-2 rounded-3xl px-5 py-1'
				)}
			>
				<StyledText type="title">{condition}</StyledText>
			</View>
			{showWorldTime && displayTime && (
				<View className={clsx('mt-1 flex flex-row items-center justify-center')}>
					<StyledText type="localtime" className={clsx('font-semibold')}>
						{useLocalTimeNow(weatherData!.location.tz_id)}
					</StyledText>
				</View>
			)}
		</View>
	);
};
