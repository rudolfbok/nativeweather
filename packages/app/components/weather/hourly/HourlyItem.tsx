import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import clsx from 'clsx';
import { StyleSheet, View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';

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
	return (
		<View className={clsx('min-h-[130px] w-14 select-none items-center justify-center gap-2')}>
			<StyledText type="body" className={clsx('font-medium')}>
				{hour}
			</StyledText>
			<View className={clsx('flex-1 items-center justify-center gap-1')}>
				<WeatherIcon isDay={isDay} code={code} width={40} height={40} strokeWidth={StyleSheet.hairlineWidth} />
				{rainChance > 0 && (
					<StyledText type="rainchance" className={clsx('!text-primaryblue')}>
						{rainChance}%
					</StyledText>
				)}
			</View>
			<StyledText type="body" className={clsx('font-semibold')}>
				{useSwitchTemp({
					celsius: tempC,
					fahrenheit: tempF,
					currentTemp: currentTemp,
				})}
			</StyledText>
		</View>
	);
};
