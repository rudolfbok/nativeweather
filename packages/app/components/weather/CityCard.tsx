import { useTolgee } from '@tolgee/react';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { useStorageBoolean, useStorageString } from 'app/storage/useStorage';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { clsx } from 'clsx';
import { GlassColorScheme } from 'expo-glass-effect';
import { DateTime } from 'luxon';
import { GestureResponderEvent, View } from 'react-native';
import { StyledPressable } from '../common/styled/StyledPressable';
import { StyledText } from '../common/styled/StyledText';

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
	tintColor?: string;
	colorScheme?: GlassColorScheme;
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
	tintColor,
	colorScheme,
}: CityCardProps) => {
	const [currentTemperature] = useStorageString('currentTemp');
	const [showWorldTime] = useStorageBoolean('showWorldTime');
	const [currentSource] = useStorageString('currentSource');
	const mapConditions = useMapConditions();

	const tolgee = useTolgee();

	const getLocalTimeNow = (timezone: string): string => {
		const lang = tolgee.getLanguage();
		const localtime = DateTime.now()
			.setZone(timezone)
			.toFormat(lang === 'en-US' ? 'hh:mm a' : 'HH:mm');
		return localtime;
	};

	return (
		<StyledPressable
			onPress={onPress}
			className={clsx(
				'w-full flex-1 select-none flex-row items-center justify-between rounded-3xl border border-transparent p-4'
			)}
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderRadius: 24,
				padding: 16,
			}}
			tintColor={`${tintColor}E6`}
			liquidGlass={true}
			colorScheme={colorScheme}
		>
			<View className={clsx('flex-grow')}>
				<StyledText
					type="subtitle"
					className={clsx('native:!text-white web:!text-white truncate font-semibold')}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{city}
				</StyledText>
				<StyledText
					type="bodysecondary"
					className={clsx('native:!text-white web:!text-white line-clamp-1 truncate font-semibold opacity-70')}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{region}
				</StyledText>
				<StyledText type="title" className={clsx('native:!text-white web:!text-white !text-xl !font-bold')}>
					{switchTemp({
						celsius: tempC,
						fahrenheit: tempF,
						currentTemp: currentTemperature,
					})}
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
				{showWorldTime && displayTime && (
					<StyledText type="localtime" className={clsx('!text-white opacity-70')}>
						{getLocalTimeNow(timeZone)}
					</StyledText>
				)}
			</View>
		</StyledPressable>
	);
};
