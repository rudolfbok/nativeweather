import { useTolgee } from '@tolgee/react';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { useStorageBoolean, useStorageString } from '@nativeweather/core/database/useStorage';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { switchTemp } from '@nativeweather/core/utils/formatting/formatTemperature';
import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { StyledText } from '../../common/styled/StyledText';

interface CardContentProps {
	city: string;
	conditionCode: number;
	isDay: 0 | 1;
	tempC: number;
	tempF: number;
	timeZone?: string;
	displayTime: boolean;
	region: string;
}

export const CardContent = ({
	city,
	conditionCode,
	isDay,
	tempC,
	tempF,
	timeZone,
	displayTime = true,
	region,
}: CardContentProps) => {
	const [currentTemperature] = useStorageString('currentTemp');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const [currentSource] = useStorageString('currentSource');
	const mapConditions = useMapConditions();
	const tolgee = useTolgee();

	const getLocalTimeNow = (timezone: string): string => {
		const lang = tolgee.getLanguage();
		return DateTime.now()
			.setZone(timezone)
			.toFormat(lang === 'en-US' ? 'hh:mm a' : 'HH:mm');
	};

	return (
		<View className="flex-row">
			<View className={clsx('flex-1')}>
				<StyledText
					type="sectiontitle"
					className={clsx('native:!text-white web:!text-white truncate font-semibold')}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{city}
				</StyledText>
				<StyledText
					type="caption"
					className={clsx('native:!text-white web:!text-white line-clamp-1 truncate font-semibold opacity-70')}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{region}
				</StyledText>
				<StyledText type="title" className={clsx('native:!text-white web:!text-white')}>
					{switchTemp({ celsius: tempC, fahrenheit: tempF, currentTemp: currentTemperature })}
				</StyledText>
				<StyledText
					type="body"
					className={clsx('native:!text-white web:!text-white line-clamp-1 truncate font-semibold')}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{mapConditions(conditionCode, isDay, currentSource)}
				</StyledText>
			</View>
			<View className={clsx('items-center')}>
				<WeatherIcon isDay={isDay} code={conditionCode} width={80} height={80} strokeWidth={0} source={currentSource} />
				{showWorldTime && displayTime && timeZone && (
					<StyledText type="caption" className={clsx('!text-white opacity-70')}>
						{getLocalTimeNow(timeZone)}
					</StyledText>
				)}
			</View>
		</View>
	);
};
