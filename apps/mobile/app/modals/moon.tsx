import { MoonModal } from '@nativeweather/ui/components/cards/moon/MoonModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function MoonModalScreen() {
	return (
		<ModalScrollView>
			<MoonModal />
		</ModalScrollView>
	);
}
