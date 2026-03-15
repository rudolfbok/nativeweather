import { UVIndexModal } from 'app/components/cards/modals/UVIndexModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function UVIndexScreen() {
	return (
		<ModalScrollView>
			<UVIndexModal />
		</ModalScrollView>
	);
}
