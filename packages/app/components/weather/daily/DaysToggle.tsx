import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledPressable } from 'app/components/common/StyledPressable';
import { StyledText } from 'app/components/common/StyledText';
import { WeatherData } from 'app/types/weatherData';
import { useTolgee } from '@tolgee/react';

interface DaysToggleProps {
	days: WeatherData['forecast']['forecastday'];
	onSelectDay: (day: WeatherData['forecast']['forecastday'][0]) => void;
}

export const DaysToggle = ({ days, onSelectDay }: DaysToggleProps) => {
	const tolgee = useTolgee();
	const getDayName = (date: string, short: boolean) =>
		new Date(date).toLocaleString(tolgee.getLanguage(), {
			weekday: short ? 'short' : 'long',
		});

	return (
		<View className={clsx('flex-row justify-between gap-2 px-4 pb-2')}>
			{days.slice(0, 7).map((day) => {
				return (
					<StyledPressable
						key={day.date}
						onPress={() => onSelectDay(day)}
						className={clsx('flex-1 items-center rounded-2xl py-2')}
					>
						<StyledText type="body" className={clsx('font-semibold')}>
							{getDayName(day.date, true)}
						</StyledText>
					</StyledPressable>
				);
			})}
		</View>
	);
};
