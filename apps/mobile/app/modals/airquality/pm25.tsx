import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { PM25Detail } from 'app/components/weather/airquality/PM25Detail';

export default function PM25ModalScreen() {
	return (
		<ModalScrollView>
			<PM25Detail />
		</ModalScrollView>
	);
}
