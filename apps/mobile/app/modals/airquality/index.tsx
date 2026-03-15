import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AirQualityModal } from 'app/components/weather/airquality/AirQualityModal';
import { useWeather } from 'app/hooks/useWeather';

export default function AQIModalScreen() {
	const { airQualityData } = useWeather();

	return (
		<ModalScrollView>
			<AirQualityModal airQualityData={airQualityData} />
		</ModalScrollView>
	);
}
