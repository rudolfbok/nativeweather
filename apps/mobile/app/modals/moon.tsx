import { MoonModal } from 'app/components/cards/moon/MoonModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function MoonModalScreen() {
	return (
		<ModalScrollView>
			<MoonModal />
		</ModalScrollView>
	);
}
