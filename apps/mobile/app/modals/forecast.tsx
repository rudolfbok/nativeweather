import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { DailyForecastMain } from 'app/components/weather/daily/DailyForecastMain';
import { useSelectedDay } from 'app/hooks/useSelectedDay';
import { DaysToggle } from 'app/components/weather/daily/DaysToggle';
import { useWeather } from 'app/hooks/useWeather';
import { useTolgee } from '@tolgee/react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
		navigation.setOptions({
			headerTitle: getDayName(selectedDay.date, false),
		});
	}, [selectedDay]);

	return (
		<ModalScrollView>
			<DaysToggle days={weatherData.forecast.forecastday} onSelectDay={(day: any) => setSelectedDay(day)} />
			<DailyForecastMain day={selectedDay} />
		</ModalScrollView>
	);
}
