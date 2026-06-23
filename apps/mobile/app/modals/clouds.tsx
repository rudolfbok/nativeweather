import { CloudsModal } from 'app/components/cards/clouds/CloudsModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function CloudsModalScreen() {
	return (
		<ModalScrollView>
			<CloudsModal />
		</ModalScrollView>
	);
}
