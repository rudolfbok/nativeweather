import { SnowModal } from '@nativeweather/ui/components/cards/snow/SnowModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function SnowModalScreen() {
	return (
		<ModalScrollView>
			<SnowModal />
		</ModalScrollView>
	);
}
