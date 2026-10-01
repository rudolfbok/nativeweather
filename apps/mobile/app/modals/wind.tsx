import { WindModal } from '@nativeweather/ui/components/cards/wind/WindModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function WindModalScreen() {
	return (
		<ModalScrollView>
			<WindModal />
		</ModalScrollView>
	);
}
