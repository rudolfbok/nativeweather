import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { NO2Detail } from 'app/components/weather/airquality/NO2Detail';

export default function NO2ModalScreen() {
	return (
		<ModalScrollView>
			<NO2Detail />
		</ModalScrollView>
	);
}
