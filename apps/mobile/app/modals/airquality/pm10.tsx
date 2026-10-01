import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { PM10Detail } from '@nativeweather/ui/components/airquality/PM10Detail';

export default function PM10ModalScreen() {
	return (
		<ModalScrollView>
			<PM10Detail />
		</ModalScrollView>
	);
}
