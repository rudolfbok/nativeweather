import { useTolgee } from '@tolgee/react';
import { WeatherIcon } from '../../icons/weather/WeatherIcon';
import { useStorageBoolean, useStorageString } from '@nativeweather/core/database/useStorage';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { View } from 'react-native';
import { StyledText } from '../../common/styled/StyledText';

interface CardContentProps {
	city: string;
	conditionCode: number | null;
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
	const [showLocalTime] = useStorageBoolean('showWorldTime');
	const mapConditions = useMapConditions();
	const tolgee = useTolgee();

	const getLocalTimeNow = (timezone: string): string => {
		const lang = tolgee.getLanguage();
		return DateTime.now()
			.setZone(timezone)
			.toFormat(lang === 'en-US' ? 'hh:mm a' : 'HH:mm');
	};

	return (
		<View className="flex-1 flex-row">
			<View className={clsx('flex-1 gap-1')}>
				<View>
					<StyledText
						type="sectiontitle"
						className={clsx('native:!text-white truncate font-semibold web:!text-white')}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{city}
					</StyledText>
					<StyledText
						type="caption"
						className={clsx('native:!text-white line-clamp-1 truncate font-semibold opacity-70 web:!text-white')}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{region}
					</StyledText>
				</View>
				<View>
					<StyledText type="title" className={clsx('native:!text-white web:!text-white')}>
						{formatTemperature({ celsius: tempC, fahrenheit: tempF, currentTemp: currentTemperature })}
					</StyledText>
					<StyledText
						type="body"
						className={clsx('native:!text-white line-clamp-1 truncate font-semibold web:!text-white')}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{mapConditions(conditionCode, isDay)}
					</StyledText>
				</View>
			</View>
			<View className={clsx('items-center')}>
				<WeatherIcon isDay={isDay} code={conditionCode} width={80} height={80} strokeWidth={0} />
				{showLocalTime && displayTime && timeZone && (
					<StyledText type="caption" className={clsx('!text-white opacity-70')}>
						{getLocalTimeNow(timeZone)}
					</StyledText>
				)}
			</View>
		</View>
	);
};
