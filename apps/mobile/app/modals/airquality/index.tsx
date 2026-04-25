import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { AirQualityModal } from 'app/components/weather/airquality/AirQualityModal';
import { useWeather } from 'app/hooks/useWeather';

export default function AQIModalScreen() {
	const { airQualityData } = useWeather();

	return (
		<ScreenWrapper>
			<AirQualityModal airQualityData={airQualityData} />
		</ScreenWrapper>
	);
}
