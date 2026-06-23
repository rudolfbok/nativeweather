import { RainModal } from 'app/components/cards/rain/RainModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function RainModalScreen() {
	return (
		<ModalScrollView>
			<RainModal />
		</ModalScrollView>
	);
}
