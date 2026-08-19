import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { ScreenWrapper } from 'app/components/layout/ScreenWrapper';
import { AirQualityModal } from 'app/components/airquality/AirQualityModal';
import { useWeather } from 'app/hooks/weather/useWeather';

export default function AQIModalScreen() {
	const { airQualityData } = useWeather();

	return (
		<ScreenWrapper>
			<AirQualityModal airQualityData={airQualityData} />
		</ScreenWrapper>
	);
}
