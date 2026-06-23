import { SunsetModal } from 'app/components/cards/sunset/SunsetModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function SunsetModalScreen() {
	return (
		<ModalScrollView>
			<SunsetModal />
		</ModalScrollView>
	);
}
