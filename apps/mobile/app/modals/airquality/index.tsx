import { ScreenWrapper } from '@nativeweather/ui/components/common/layout/ScreenWrapper';
import { AirQualityModal } from '@nativeweather/ui/components/airquality/AirQualityModal';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';

export default function AQIModalScreen() {
	const { airQualityData } = useWeather();

	return (
		<ScreenWrapper>
			<AirQualityModal airQualityData={airQualityData} />
		</ScreenWrapper>
	);
}
