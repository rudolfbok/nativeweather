import { SnowModal } from 'app/components/cards/snow/SnowModal';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';

export default function SnowModalScreen() {
	return (
		<ModalScrollView>
			<SnowModal />
		</ModalScrollView>
	);
}
