import { CloudsModal } from 'app/components/cards/modals/CloudsModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function CloudsModalScreen() {
	return (
		<ModalScrollView>
			<CloudsModal />
		</ModalScrollView>
	);
}
