import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
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
		<View className={clsx('my-2 flex-row justify-between gap-2 border-blue-400')}>
			{days.slice(0, 7).map((day) => {
				return (
					<StyledPressable
						key={day.date}
						onPress={() => onSelectDay(day)}
						className={clsx('w-[45px] flex-1 items-center justify-center rounded-3xl py-2')}
						liquidGlass={true}
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
