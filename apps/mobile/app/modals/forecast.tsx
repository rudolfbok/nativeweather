import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { DailyForecastMain } from '@nativeweather/ui/components/weather/daily/DailyForecastMain';
import { useSelectedDay } from '@nativeweather/ui/hooks/weather/useSelectedDay';
import { DaysToggle } from '@nativeweather/ui/components/weather/daily/DaysToggle';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useTolgee } from '@tolgee/react';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { NormalizedData } from '@nativeweather/types/normalizedData';

export default function ForecastModalScreen() {
	const { weatherData } = useWeather();
	const { selectedDay, setSelectedDay } = useSelectedDay();
	const tolgee = useTolgee();
	const navigation = useNavigation();

	const getDayName = (date: string, short: boolean) =>
		new Date(date).toLocaleString(tolgee.getLanguage(), {
			weekday: short ? 'short' : 'long',
			day: 'numeric',
			month: 'long',
		});

	useEffect(() => {
		if (!selectedDay) return;
		navigation.setOptions({
			headerTitle: getDayName(selectedDay.date, false),
		});
	}, [selectedDay]);

	if (!weatherData || !selectedDay) return null;

	return (
		<ModalScrollView>
			<DaysToggle
				days={weatherData.forecast.forecastday}
				onSelectDay={(day: NormalizedData['forecast']['forecastday'][0]) => setSelectedDay(day)}
			/>
			<DailyForecastMain day={selectedDay} />
		</ModalScrollView>
	);
}
