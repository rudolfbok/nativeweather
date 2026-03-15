import { VisibilityModal } from 'app/components/cards/modals/VisibilityModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function VisibilityModalScreen() {
	return (
		<ModalScrollView>
			<VisibilityModal />
		</ModalScrollView>
	);
}
