import { CloudsModal } from '@nativeweather/ui/components/cards/clouds/CloudsModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function CloudsModalScreen() {
	return (
		<ModalScrollView>
			<CloudsModal />
		</ModalScrollView>
	);
}
