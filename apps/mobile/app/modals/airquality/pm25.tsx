import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { PM25Detail } from '@nativeweather/ui/components/airquality/PM25Detail';

export default function PM25ModalScreen() {
	return (
		<ModalScrollView>
			<PM25Detail />
		</ModalScrollView>
	);
}
