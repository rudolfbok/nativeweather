import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { PM10Detail } from 'app/components/airquality/PM10Detail';

export default function PM10ModalScreen() {
	return (
		<ModalScrollView>
			<PM10Detail />
		</ModalScrollView>
	);
}
