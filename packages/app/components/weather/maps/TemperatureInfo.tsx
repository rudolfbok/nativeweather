import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';

const celsiusStops = [
	{ temp: -50, color: '#000082' },
	{ temp: -20, color: '#0078ff' },
	{ temp: 0, color: '#96fffe' },
	{ temp: 10, color: '#79ff77' },
	{ temp: 20, color: '#ffff00' },
	{ temp: 30, color: '#ff9600' },
	{ temp: 40, color: '#ff0000' },
];

const fahrenheitStops = [
	{ temp: -58, color: '#000082' },
	{ temp: -4, color: '#0078ff' },
	{ temp: 32, color: '#96fffe' },
	{ temp: 50, color: '#79ff77' },
	{ temp: 68, color: '#ffff00' },
	{ temp: 86, color: '#ff9600' },
	{ temp: 104, color: '#ff0000' },
];

export const TemperatureInfo = () => {
	const [currentTemp] = useStorageString('currentTemp');
	const { t } = useTranslate('weather');

	const stops = currentTemp === 'celsius' ? celsiusStops : fahrenheitStops;
	const minTemp = stops[0].temp;
	const maxTemp = stops[stops.length - 1].temp;
	const getStopLocation = (temp: number) => (temp - minTemp) / (maxTemp - minTemp);
	const locations = stops.map((stop) => getStopLocation(stop.temp)) as unknown as readonly [
		number,
		number,
		...number[],
	];
	const colors = stops.map((stop) => stop.color) as unknown as readonly [string, string, ...string[]];

	return (
		<View>
			<StyledText type="body">{t('maps.legend.temperature')}</StyledText>
			<View className={clsx('relative mt-2 h-14 w-full overflow-hidden rounded-2xl')}>
				<LinearGradient
					colors={colors}
					locations={locations}
					style={{ flex: 1 }}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
				>
					<View className={clsx('ml-1 mr-6 flex-1 flex-row items-center justify-between md:mr-7')}>
						{stops.map((stop, index) => (
							<View
								key={index}
								className={clsx('absolute items-center')}
								style={{ left: `${getStopLocation(stop.temp) * 100}%` }}
							>
								<StyledText type="bodysecondary" className={clsx('font-semibold !text-black')}>
									{stop.temp}°
								</StyledText>
								<View className={clsx('h-4 w-[2px] bg-black')} />
							</View>
						))}
					</View>
				</LinearGradient>
			</View>
		</View>
	);
};
