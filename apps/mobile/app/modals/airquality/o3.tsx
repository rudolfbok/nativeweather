import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { O3Detail } from '@nativeweather/ui/components/airquality/O3Detail';

export default function O3ModalScreen() {
	return (
		<ModalScrollView>
			<O3Detail />
		</ModalScrollView>
	);
}
