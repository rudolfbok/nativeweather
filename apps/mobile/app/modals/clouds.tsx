import { CloudsModal } from 'app/components/cards/clouds/CloudsModal';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';

export default function CloudsModalScreen() {
	return (
		<ModalScrollView>
			<CloudsModal />
		</ModalScrollView>
	);
}
