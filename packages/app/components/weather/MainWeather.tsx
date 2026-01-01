import { useTranslate } from '@tolgee/react';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import { clsx } from 'clsx';
import { MoveDown, MoveUp } from 'lucide-react-native';
import { View } from 'react-native';
import { StyledText } from '../common/StyledText';

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
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');

	return (
		<View className={clsx('relative mt-2 items-center gap-2')}>
			<View className={clsx('w-[80%] flex-row items-center')}>
				<View className={clsx('w-1/2 items-center')}>
					<WeatherIcon isDay={isDay} code={code} width={90} height={90} strokeWidth={strokeWidth} />
				</View>
				<View className={clsx('w-1/2 items-center')}>
					<StyledText type="maintemp" className={clsx('pl-4', textcolor)}>
						{useSwitchTemp({
							celsius: currentTempC,
							fahrenheit: currentTempF,
							currentTemp: currentTemperature,
						})}
					</StyledText>
					<View className={clsx('flex flex-row items-center gap-1')}>
						<View className={clsx('flex flex-row items-center')}>
							<MoveDown size={18} color={arrowcolor} />
							<StyledText type="body" className={clsx(textcolor)}>
								{useSwitchTemp({
									celsius: minTempC,
									fahrenheit: minTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
						<View className={clsx('flex flex-row items-center')}>
							<MoveUp size={18} color={arrowcolor} />
							<StyledText type="body" className={clsx(textcolor)}>
								{useSwitchTemp({
									celsius: maxTempC,
									fahrenheit: maxTempF,
									currentTemp: currentTemperature,
								})}
							</StyledText>
						</View>
					</View>
					{feelslike && (
						<StyledText type="subtitle" className={clsx('font-semibold', textcolor)}>
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
			<View className={clsx('items-center')}>
				<StyledText
					type="subtitle"
					className={clsx(
						'text-center text-xl font-bold',
						textcolor,
						conditionbg && 'bg-systemBackground dark:bg-secondarySystemBackground_dark rounded-3xl px-5 py-1'
					)}
				>
					{condition}
				</StyledText>
				{/* {showWorldTime && displayTime && (
					<View className={clsx('mt-1 flex flex-row items-center justify-center')}>
						<StyledText type="localtime">{useLocalTimeNow(weatherData!.location.tz_id)}</StyledText>
					</View>
				)} */}
			</View>
		</View>
	);
};
