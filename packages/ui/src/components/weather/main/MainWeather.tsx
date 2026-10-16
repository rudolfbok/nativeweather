import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ArrowDownIcon } from '@nativeweather/ui/components/icons/ui/ArrowDownIcon';
import { ArrowUpIcon } from '@nativeweather/ui/components/icons/ui/ArrowUpIcon';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { textOutline } from '@nativeweather/core/constants/textOutline';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { WeatherLandscape } from '@nativeweather/ui/utils/mappings/landscapes';
import { clsx } from 'clsx';
import { BlurView } from 'expo-blur';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';

const StyledBlurView = cssInterop(BlurView, { className: 'style' });

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
	const { t } = useTranslate('weather');
	const [currentTemperature] = useStorageString('currentTemp');

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
					<WeatherIcon isDay={isDay} code={code} width={100} height={100} strokeWidth={0} />
					<View className={clsx('items-center')}>
						<StyledText type="display" className={clsx('pl-3', '!text-white')} style={textOutline}>
							{formatTemperature({
								celsius: currentTempC,
								fahrenheit: currentTempF,
								currentTemp: currentTemperature,
							})}
						</StyledText>
						<View className={clsx('flex flex-row items-center gap-1')}>
							<View className={clsx('flex flex-row items-center')}>
								<ArrowDownIcon />
								<StyledText type="body" className={clsx('!text-white')} style={textOutline}>
									{formatTemperature({
										celsius: minTempC,
										fahrenheit: minTempF,
										currentTemp: currentTemperature,
									})}
								</StyledText>
							</View>
							<View className={clsx('flex flex-row items-center')}>
								<ArrowUpIcon />
								<StyledText type="body" className={clsx('!text-white')} style={textOutline}>
									{formatTemperature({
										celsius: maxTempC,
										fahrenheit: maxTempF,
										currentTemp: currentTemperature,
									})}
								</StyledText>
							</View>
						</View>
						{feelslike && (
							<StyledText type="body" className={clsx('!text-white')} style={textOutline}>
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
				<StyledBlurView
					className={clsx('relative z-10 overflow-hidden rounded-3xl px-4 py-2')}
					tint="light"
					intensity={30}
				>
					<StyledText type="title" className={clsx('!text-white')} style={textOutline}>
						{condition}
					</StyledText>
				</StyledBlurView>
			</View>
		</>
	);
};
