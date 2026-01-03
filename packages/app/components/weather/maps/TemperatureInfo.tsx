import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { StyledText } from 'app/components/common/StyledText';
import { View } from 'react-native';

export const TemperatureInfo = () => {
	const [currentTemp] = useStorageString('currentTemp');
	const { t } = useTranslate('weather');

	const celsiusStops = [
		{ temp: -30, color: 'rgba(130, 87, 219, 1)' },
		{ temp: -20, color: 'rgba(32, 140, 236, 1)' },
		{ temp: -10, color: 'rgba(32, 196, 232, 1)' },
		{ temp: 0, color: 'rgba(35, 221, 221, 1)' },
		{ temp: 10, color: 'rgba(194, 255, 40, 1)' },
		{ temp: 20, color: 'rgba(255, 240, 40, 1)' },
		{ temp: 25, color: 'rgba(255, 194, 40, 1)' },
		{ temp: 30, color: 'rgba(252, 128, 20, 1)' },
	];

	const fahrenheitStops = [
		{ temp: -22, color: 'rgba(130, 87, 219, 1)' },
		{ temp: -4, color: 'rgba(32, 140, 236, 1)' },
		{ temp: 14, color: 'rgba(32, 196, 232, 1)' },
		{ temp: 32, color: 'rgba(35, 221, 221, 1)' },
		{ temp: 50, color: 'rgba(194, 255, 40, 1)' },
		{ temp: 68, color: 'rgba(255, 240, 40, 1)' },
		{ temp: 77, color: 'rgba(255, 194, 40, 1)' },
		{ temp: 86, color: 'rgba(252, 128, 20, 1)' },
	];

	const stops = currentTemp === 'celsius' ? celsiusStops : fahrenheitStops;

	// CSS linear-gradient string
	const gradient = `linear-gradient(to right, ${stops
		.map((stop, index) => {
			const percent = (index / (stops.length - 1)) * 100;
			return `${stop.color} ${percent}%`;
		})
		.join(', ')})`;

	return (
		<View>
			<StyledText type="body">{t('maps.legend.temperature')}</StyledText>
			<View className={clsx('relative mt-2 h-14 w-full overflow-hidden rounded-2xl')} style={{ background: gradient }}>
				<View className={clsx('relative ml-1 mr-6 h-full flex-1 flex-row items-center justify-between md:mr-7')}>
					{stops.map((stop, index) => (
						<View
							key={index}
							className={clsx('absolute flex flex-col items-center')}
							style={{ left: `${(index / (stops.length - 1)) * 100}%` }}
						>
							<StyledText type="bodysecondary" className={clsx('font-semibold !text-black')}>
								{stop.temp}°
							</StyledText>
							<View className={clsx('h-4 w-[2px] bg-black')} />
						</View>
					))}
				</View>
			</View>
		</View>
	);
};
