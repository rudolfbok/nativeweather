import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { DailyForecastMain } from '@nativeweather/ui/components/weather/daily/DailyForecastMain';
import { useSelectedDay } from '@nativeweather/ui/hooks/weather/useSelectedDay';
import { DaysToggle } from '@nativeweather/ui/components/weather/daily/DaysToggle';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { useTolgee } from '@tolgee/react';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import type { NormalizedData } from '@nativeweather/types/normalizedData';

const getDayName = (date: string, short: boolean, language: string) =>
	new Date(date).toLocaleString(language, {
		weekday: short ? 'short' : 'long',
		day: 'numeric',
		month: 'long',
	});

export default function ForecastModalScreen() {
	const { weatherData } = useWeather();
	const { selectedDay, setSelectedDay } = useSelectedDay();
	const tolgee = useTolgee();
	const navigation = useNavigation();
	const language = tolgee.getLanguage();

	useEffect(() => {
		if (!selectedDay) return;
		navigation.setOptions({
			headerTitle: getDayName(selectedDay.date, false, language ?? 'en-US'),
		});
	}, [language, navigation, selectedDay]);

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
