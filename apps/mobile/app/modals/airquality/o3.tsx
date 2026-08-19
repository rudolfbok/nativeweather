import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { O3Detail } from 'app/components/airquality/O3Detail';

export default function O3ModalScreen() {
	return (
		<ModalScrollView>
			<O3Detail />
		</ModalScrollView>
	);
}
