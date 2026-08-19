import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { NO2Detail } from 'app/components/airquality/NO2Detail';

export default function NO2ModalScreen() {
	return (
		<ModalScrollView>
			<NO2Detail />
		</ModalScrollView>
	);
}
