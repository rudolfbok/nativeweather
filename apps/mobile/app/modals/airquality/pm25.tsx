import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { PM25Detail } from 'app/components/airquality/PM25Detail';

export default function PM25ModalScreen() {
	return (
		<ModalScrollView>
			<PM25Detail />
		</ModalScrollView>
	);
}
