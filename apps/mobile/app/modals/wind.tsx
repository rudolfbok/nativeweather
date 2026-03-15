import { WindModal } from 'app/components/cards/modals/WindModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function WindModalScreen() {
	return (
		<ModalScrollView>
			<WindModal />
		</ModalScrollView>
	);
}
