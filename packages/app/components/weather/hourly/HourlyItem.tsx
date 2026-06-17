import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { clsx } from 'clsx';
import { StyleSheet, View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useStorageString } from 'app/storage/useStorage';
import { switchTemp } from 'app/utils/switch/switchTemp';

interface HourlyItemProps {
	hour: number | string;
	isDay: 0 | 1;
	code: number;
	rainChance: number;
	tempC: number;
	tempF: number;
}

export const HourlyItem = ({ hour, isDay, code, rainChance, tempC, tempF }: HourlyItemProps) => {
	const [currentTemp] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	return (
		<View className={clsx('min-h-[130px] w-14 select-none items-center justify-center gap-2')}>
			<StyledText type="body" className={clsx('font-medium')}>
				{hour}
			</StyledText>
			<View className={clsx('flex-1 items-center justify-center gap-1')}>
				<WeatherIcon
					isDay={isDay}
					code={code}
					width={40}
					height={40}
					strokeWidth={StyleSheet.hairlineWidth}
					source={currentSource}
				/>
				{rainChance > 10 && (
					<StyledText type="rainchance" className={clsx('!text-primaryblue')}>
						{Math.round(rainChance)}%
					</StyledText>
				)}
			</View>
			<StyledText type="body" className={clsx('font-semibold')}>
				{switchTemp({
					celsius: tempC,
					fahrenheit: tempF,
					currentTemp: currentTemp,
				})}
			</StyledText>
		</View>
	);
};
