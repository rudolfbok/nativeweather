import { UVModal } from 'app/components/cards/uv/UVModal';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';

export default function UVScreen() {
	return (
		<ModalScrollView>
			<UVModal />
		</ModalScrollView>
	);
}
