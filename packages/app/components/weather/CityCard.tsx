import { useTolgee } from '@tolgee/react';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { useStorageString } from 'app/storage/useStorageString';
import { useWeatherConditions } from 'app/utils/mappings/mapConditions';
import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { GestureResponderEvent, View } from 'react-native';
import { StyledPressable } from '../common/StyledPressable';
import { StyledText } from '../common/StyledText';

interface CityCardProps {
	onPress: (event?: GestureResponderEvent) => void;
	city: string;
	conditionCode: number;
	isDay: 0 | 1;
	tempC: number;
	tempF: number;
	timeZone?: string;
	displayTime: boolean;
	region: string;
}

export const CityCard = ({
	onPress,
	city,
	conditionCode,
	isDay,
	tempC,
	tempF,
	timeZone,
	displayTime = true,
	region,
}: CityCardProps) => {
	const [currentTemperature] = useStorageString('currentTemp');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const getWeatherByCode = useWeatherConditions();

	const tolgee = useTolgee();

	const useLocalTimeNow = (timezone: string): string => {
		const lang = tolgee.getLanguage();
		const localtime = DateTime.now()
			.setZone(timezone)
			.toFormat(lang === 'en-US' ? 'hh:mm a' : 'HH:mm');
		return localtime;
	};

	return (
		<StyledPressable
			onPress={onPress}
			className={clsx('flex flex-1 select-none flex-row items-center justify-between rounded-3xl p-4')}
		>
			<View className="flex-1">
				<StyledText type="subtitle" className={clsx('truncate font-semibold')}>
					{city}
				</StyledText>
				<StyledText
					type="bodysecondary"
					className={clsx('text-secondaryLabel dark:text-secondaryLabel_dark line-clamp-1 truncate font-semibold')}
				>
					{region}
				</StyledText>
				<StyledText type="title" className={clsx('!text-xl font-semibold')}>
					{useSwitchTemp({
						celsius: tempC,
						fahrenheit: tempF,
						currentTemp: currentTemperature,
					})}
				</StyledText>
				<StyledText type="body" className={clsx('line-clamp-1 truncate font-semibold')}>
					{getWeatherByCode(conditionCode, isDay)}
				</StyledText>
			</View>
			<View className={clsx('items-center')}>
				<WeatherIcon isDay={isDay} code={conditionCode} width={80} height={80} strokeWidth={0.5} />
				{showWorldTime && displayTime && (
					<StyledText type="localtime" className={clsx('text-secondaryLabel dark:text-secondaryLabel_dark')}>
						{useLocalTimeNow(timeZone)}
					</StyledText>
				)}
			</View>
		</StyledPressable>
	);
};
