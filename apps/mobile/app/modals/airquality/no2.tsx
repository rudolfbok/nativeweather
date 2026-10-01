import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { NO2Detail } from '@nativeweather/ui/components/airquality/NO2Detail';

export default function NO2ModalScreen() {
	return (
		<ModalScrollView>
			<NO2Detail />
		</ModalScrollView>
	);
}
