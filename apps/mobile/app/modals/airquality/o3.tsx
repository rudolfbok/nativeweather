import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { O3Detail } from 'app/components/weather/airquality/O3Detail';

export default function O3ModalScreen() {
	return (
		<ModalScrollView>
			<O3Detail />
		</ModalScrollView>
	);
}
