import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { PM10Detail } from 'app/components/weather/airquality/PM10Detail';

export default function PM10ModalScreen() {
	return (
		<ModalScrollView>
			<PM10Detail />
		</ModalScrollView>
	);
}
