import { SunsetModal } from '@nativeweather/ui/components/cards/sunset/SunsetModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function SunsetModalScreen() {
	return (
		<ModalScrollView>
			<SunsetModal />
		</ModalScrollView>
	);
}
